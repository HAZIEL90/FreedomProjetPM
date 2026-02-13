import { useState } from 'react';
import { ShoppingBag, Package } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string) => void;
  onBuyNow: (product: Product, size: string) => void;
}

export default function ProductCard({ product, onAddToCart, onBuyNow }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Package className="w-24 h-24 text-gray-300 group-hover:text-orange-400 transition-colors duration-300" />
        <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-full text-sm font-bold">
          Stock: {product.stock}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl font-bold text-orange-600">${product.price}</span>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Selecciona Talla:
          </label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  selectedSize === size
                    ? 'bg-black text-white shadow-md transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => onAddToCart(product, selectedSize)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center space-x-2"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Agregar al Carrito</span>
          </button>

          <button
            onClick={() => onBuyNow(product, selectedSize)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}
