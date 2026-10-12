'use client';
import { db } from './config';
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, serverTimestamp, type DocumentData,
} from 'firebase/firestore';

export const col = (name: string) => collection(db, name);

export async function getCollection<T = DocumentData>(name: string): Promise<(T & { id: string })[]> {
  const snap = await getDocs(col(name));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}

export async function getDocument<T = DocumentData>(name: string, id: string): Promise<(T & { id: string }) | null> {
  const snap = await getDoc(doc(db, name, id));
  return snap.exists() ? ({ id: snap.id, ...(snap.data() as T) }) : null;
}

export async function createDocument(name: string, data: DocumentData) {
  return addDoc(col(name), { ...data, createdAt: serverTimestamp() });
}

export async function updateDocument(name: string, id: string, data: DocumentData) {
  return updateDoc(doc(db, name, id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteDocument(name: string, id: string) {
  return deleteDoc(doc(db, name, id));
}

export async function getActiveProducts<T = DocumentData>(name = 'products') {
  const q = query(col(name), where('active', '==', true), orderBy('name'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
}