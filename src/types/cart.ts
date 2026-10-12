export interface CartItem {
  id: string;       // productId + color (chave única)
  productId: string;
  slug: string;
  name: string;
  color: string;
  quantity: number;
  notes?: string;
  image?: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateNotes: (id: string, notes: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  totalItems: () => number;
}