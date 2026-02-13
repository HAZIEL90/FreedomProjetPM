import { Product } from '../types';
import ProductCard from './ProductCard';

interface CategorySectionProps {
  title: string;
  icon: React.ReactNode;
  products: Product[];
  onAddToCart: (product: Product, size: string) => void;
  onBuyNow: (product: Product, size: string) => void;
}

export default function CategorySection({ title, icon, products, onAddToCart, onBuyNow }: CategorySectionProps) {
  return (
    <section className="mb-16">
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-xl shadow-lg">
          {icon}
        </div>
        <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
          />
        ))}
      </div>
    </section>
  );
}
