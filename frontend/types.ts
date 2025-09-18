// --- TYPE DEFINITIONS ---
export interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  availability: 'in-stock' | 'low-stock' | 'out-of-stock';
  category: string;
  artisan?: string;
  materials?: string[];
  dimensions?: string;
  weight?: string;
  craftingTime?: string;
  isHandmade: boolean;
  isFeatured?: boolean;
}

export interface ProductCardProps {
  product: Product;
}

export interface ProductSectionProps {
  title: string;
  products: Product[];
  gridCols?: string;
  aspectRatio?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}