import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product } from "@/types";

const COL = "products";

export async function listActiveProducts(): Promise<Product[]> {
  // Sem orderBy — evita exigir índice composto no Firestore
  const q = query(
    collection(db, COL),
    where("active", "==", true)
  );
  const snap = await getDocs(q);
  const products = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Product, "id">),
  }));

  // Ordena no cliente: mais recentes primeiro
  return products.sort((a, b) => {
    const aT = (a as any).createdAt?.seconds ?? 0;
    const bT = (b as any).createdAt?.seconds ?? 0;
    return bT - aT;
  });
}

export async function listAllProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, "id">) }));
}

export async function getProduct(id: string): Promise<Product | null> {
  const ref = doc(db, COL, id);
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...(snap.data() as Omit<Product, "id">) }) : null;
}

export async function createProduct(data: Omit<Product, "id" | "createdAt" | "updatedAt">) {
  return addDoc(collection(db, COL), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateProduct(id: string, data: Partial<Product>) {
  return updateDoc(doc(db, COL, id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteProduct(id: string) {
  return deleteDoc(doc(db, COL, id));
}
