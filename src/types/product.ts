export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  colors: string[];
  images: string[];
  imagePublicIds?: string[]; // IDs do Cloudinary para permitir delete/substituição
  active: boolean;
  featured: boolean;
  createdAt?: string;
  updatedAt?: string;
}