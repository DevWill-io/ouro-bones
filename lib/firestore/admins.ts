import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const COL = "admins";

export async function listAdmins() {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as { email?: string; addedAt?: any }),
  }));
}

export async function isAdmin(uid: string) {
  const snap = await getDoc(doc(db, COL, uid));
  return snap.exists();
}

export async function addAdmin(uid: string, email: string) {
  await setDoc(doc(db, COL, uid), {
    email: email.toLowerCase().trim(),
    addedAt: serverTimestamp(),
  });
}

export async function removeAdmin(uid: string) {
  await deleteDoc(doc(db, COL, uid));
}
