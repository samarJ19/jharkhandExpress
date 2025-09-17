import type { ProductSectionProps } from '../../types';
import { ProductCard } from './ProductCardCommerce';
export const ProductSection: React.FC<ProductSectionProps> = ({ title, products, gridCols, aspectRatio }) => (
  <section className="py-12">
    <h2 className="text-text-primary text-3xl font-bold tracking-tight px-4 pb-6">{title}</h2>
    <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} aspectRatio={aspectRatio} />
      ))}
    </div>
  </section>
);
