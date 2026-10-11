import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { User } from "firebase/auth";

const COL = "users";

/** Salva/atualiza o usuário logado na coleção users. Idempotente. */
export async function upsertUser(user: User) {
  if (!user.email) return;
  const ref = doc(db, COL, user.uid);
  const existing = await getDoc(ref);

  if (existing.exists()) {
    await setDoc(
      ref,
      {
        email: user.email.toLowerCase().trim(),
        name: user.displayName ?? "",
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } else {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email.toLowerCase().trim(),
      name: user.displayName ?? "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}

/** Busca um usuário na coleção users pelo e-mail. */
export async function findUserByEmail(email: string) {
  const q = query(
    collection(db, COL),
    where("email", "==", email.toLowerCase().trim())
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return {
    id: d.id,
    ...(d.data() as { uid: string; email: string; name?: string }),
  };
}

/** Lista todos os usuários cadastrados (apenas admin pode chamar). */
export async function listAllUsers() {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as { uid: string; email: string; name?: string }),
  }));
}
