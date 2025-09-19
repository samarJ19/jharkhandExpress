import type { ProductSectionProps, Product } from '../../types';
import { ProductCard } from './ProductCardCommerce';

interface ExtendedProductSectionProps extends ProductSectionProps {
  onProductClick: (product: Product) => void;
}

export const ProductSection: React.FC<ExtendedProductSectionProps> = ({ 
  title, 
  products, 
  gridCols, 
  aspectRatio,
  onProductClick 
}) => (
  <section className="py-12">
    <h2 className="text-text-primary text-3xl font-bold tracking-tight px-4 pb-6">{title}</h2>
    <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          aspectRatio={aspectRatio}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  </section>
);
