export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageUrls?: string[];
  wholesalePrice: number;
  suggestedRetailPrice?: number;
  variants: string[];         // ex: ["Preto", "Branco", "Azul Marinho"]
  minUnits?: number;          // opcional — herda o global (30)
  active: boolean;
  createdAt?: number;
  updatedAt?: number;
};

export type AdminUser = {
  uid: string;
  email: string;
  displayName?: string;
};