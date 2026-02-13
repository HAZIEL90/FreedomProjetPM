import { useState, useEffect } from 'react';
import { Loader2, Shirt, Users, Sparkles, Footprints } from 'lucide-react';
import { supabase } from './lib/supabase';
import { Product, CartItem } from './types';
import Header from './components/Header';
import Cart from './components/Cart';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }

  const addToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, size, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, size: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size))
    );
  };

  const buyNow = (product: Product, size: string) => {
    const message = `*🛍️ PEDIDO - Freedom Projet PM*%0A%0A*Producto:* ${product.name}%0A*Talla:* ${size}%0A*Precio:* $${product.price}%0A%0A¡Quiero comprarlo! 🔥`;
    const phoneNumber = '1234567890';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const getCategoryProducts = (category: string) => {
    return products.filter((p) => p.category === category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Header cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 py-12">
            <h1 className="text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 bg-clip-text text-transparent">
                FREEDOM PROJET PM
              </span>
            </h1>
            <p className="text-2xl text-gray-700 font-semibold uppercase tracking-widest">
              Sneaker & Streetwear Store
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-gray-600">
              <Sparkles className="w-5 h-5 text-orange-500" />
              <p className="text-lg">Los mejores productos de streetwear al mejor precio</p>
              <Sparkles className="w-5 h-5 text-orange-500" />
            </div>
          </div>

          <CategorySection
            title="ZAPATILLAS"
            icon={<Footprints className="w-8 h-8 text-white" />}
            products={getCategoryProducts('zapatillas')}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
          />

          <CategorySection
            title="ROPA HOMBRE"
            icon={<Users className="w-8 h-8 text-white" />}
            products={getCategoryProducts('ropa_hombre')}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
          />

          <CategorySection
            title="ROPA MUJER"
            icon={<Shirt className="w-8 h-8 text-white" />}
            products={getCategoryProducts('ropa_mujer')}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
          />

          <CategorySection
            title="GORRAS"
            icon={<Sparkles className="w-8 h-8 text-white" />}
            products={getCategoryProducts('gorras')}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
