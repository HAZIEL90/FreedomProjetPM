import { Instagram, Facebook, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              FREEDOM
            </span>
            <span className="ml-2">PROJET PM</span>
          </h2>
          <p className="text-gray-400 uppercase tracking-widest text-sm">
            Sneaker & Streetwear Store
          </p>
        </div>

        <div className="flex items-center justify-center space-x-6 mb-8">
          <a
            href="https://www.instagram.com/freedom_project_pm/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-4 rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-lg">
              <Instagram className="w-8 h-8" />
            </div>
          </a>

          <a
            href="https://www.facebook.com/Fredoomproject2025/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-blue-600 hover:bg-blue-700 p-4 rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-lg">
              <Facebook className="w-8 h-8" />
            </div>
          </a>
        </div>

        <div className="text-center space-y-2">
          <p className="text-gray-400 text-sm">Síguenos en nuestras redes sociales</p>
          <p className="text-gray-500 text-xs flex items-center justify-center space-x-1">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>para los amantes del streetwear</span>
          </p>
          <p className="text-gray-600 text-xs mt-4">
            © 2026 Freedom Projet PM. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
