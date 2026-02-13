import { X, Trash2, Plus, Minus, Send } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, newQuantity: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const sendWhatsAppOrder = () => {
    let message = '*🛍️ NUEVO PEDIDO - Freedom Projet PM*%0A%0A';

    items.forEach((item, index) => {
      message += `*${index + 1}.* ${item.product.name}%0A`;
      message += `   - Talla: ${item.size}%0A`;
      message += `   - Cantidad: ${item.quantity}%0A`;
      message += `   - Precio: $${item.product.price * item.quantity}%0A%0A`;
    });

    message += `*TOTAL: $${total}*%0A%0A`;
    message += '¡Gracias por tu pedido! 🔥';

    const phoneNumber = '1234567890';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div className="h-full flex flex-col">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Tu Carrito</h2>
            <button
              onClick={onClose}
              className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                <p className="text-gray-400 mt-2">¡Agrega algunos productos increíbles!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-orange-300 transition-all"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">Talla: {item.size}</p>
                        <p className="text-lg font-bold text-orange-600 mt-1">
                          ${item.product.price}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.size)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 bg-white rounded-lg border border-gray-300">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, Math.max(1, item.quantity - 1))}
                          className="p-2 hover:bg-gray-100 rounded-l-lg transition-all"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 rounded-r-lg transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-bold text-gray-900">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-gray-900">TOTAL:</span>
                <span className="text-3xl font-bold text-orange-600">${total}</span>
              </div>
              <button
                onClick={sendWhatsAppOrder}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Enviar Pedido por WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
