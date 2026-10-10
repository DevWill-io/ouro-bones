/**
 * Rode com: npx tsx scripts/seed-products.ts
 * Requer variáveis NEXT_PUBLIC_FIREBASE_* no ambiente.
 * Crie um script "seed" no package.json: "tsx scripts/seed-products.ts"
 */
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const db = getFirestore(app);

const SEED = [
  {
    name: "Boné Trucker Clássico",
    description: "Aba curva, tela respirável nas laterais e fechamento snapback.",
    imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    wholesalePrice: 32.9,
    variants: ["Preto", "Branco", "Azul Marinho", "Vermelho"],
    active: true,
  },
  {
    name: "Boné Aba Reta Premium",
    description: "Estrutura firme, tecido gabardine e logo bordada com alta definição.",
    imageUrl: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&q=80",
    wholesalePrice: 38.5,
    variants: ["Preto", "Cinza", "Bege"],
    active: true,
  },
  {
    name: "Boné Dad Hat",
    description: "Modelo casual com aba curva, ideal para uso diário e eventos.",
    imageUrl: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=800&q=80",
    wholesalePrice: 29.9,
    variants: ["Preto", "Branco", "Verde Militar"],
    active: true,
  },
  {
    name: "Boné Trucker Duplo",
    description: "Duas cores contrastantes, tela respirável e ajuste snapback metálico.",
    imageUrl: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&q=80",
    wholesalePrice: 41.0,
    variants: ["Preto/Branco", "Azul/Branco", "Vermelho/Preto"],
    active: true,
  },
];

async function main() {
  for (const p of SEED) {
    await addDoc(collection(db, "products"), {
      ...p,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("✅ Inserido:", p.name);
  }
  console.log("🎉 Seed concluído!");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
