// --- TYPE DEFINITIONS ---
export interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
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