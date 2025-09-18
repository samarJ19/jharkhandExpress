import type { ProductCardProps } from '../../types';

interface ExtendedProductCardProps extends ProductCardProps {
  aspectRatio?: string;
  onProductClick: (product: any) => void;
}

export const ProductCard: React.FC<ExtendedProductCardProps> = ({ 
  product, 
  aspectRatio = 'aspect-square',
  onProductClick 
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock': return 'text-green-600';
      case 'low-stock': return 'text-orange-600';
      case 'out-of-stock': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div 
      className="flex flex-col gap-3 group cursor-pointer" 
      onClick={() => onProductClick(product)}
    >
      <div className={`relative w-full bg-center bg-no-repeat ${aspectRatio} bg-cover rounded-lg overflow-hidden`}>
        <img 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          src={product.image}
        />
        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
        {product.isFeatured && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
            Featured
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div>
          <p className="text-text-primary text-lg font-semibold leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors">
            {product.title}
          </p>
          <p className="text-text-secondary text-sm font-normal leading-normal line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-xs text-gray-600 ml-1">({product.reviewCount})</span>
          </div>
          <span className={`text-xs font-medium ${getAvailabilityColor(product.availability)}`}>
            {product.availability === 'in-stock' ? 'In Stock' : 
             product.availability === 'low-stock' ? 'Limited' : 'Out of Stock'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.artisan && (
            <span className="text-xs text-gray-600">by {product.artisan}</span>
          )}
        </div>

        <button 
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors group-hover:shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            onProductClick(product);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};
