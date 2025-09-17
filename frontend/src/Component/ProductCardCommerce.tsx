import type { ProductCardProps } from '../../types';
export const ProductCard: React.FC<ProductCardProps & { aspectRatio?: string }> = ({ product, aspectRatio = 'aspect-square' }) => (
  <div className="flex flex-col gap-4 group">
    <div className={`w-full bg-center bg-no-repeat ${aspectRatio} bg-cover rounded-lg overflow-hidden`}>
      <img 
        alt={product.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        src={product.image}
      />
    </div>
    <div>
      <p className="text-text-primary text-lg font-semibold leading-normal">{product.title}</p>
      <p className="text-text-secondary text-base font-normal leading-normal">{product.description}</p>
    </div>
  </div>
);
