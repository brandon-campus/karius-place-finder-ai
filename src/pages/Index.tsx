
import React from 'react';
import { MessageCircle, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-karius-light-purple/50 to-white p-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-karius-dark-purple mb-3">
          Karius
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto">
          Descubre el lugar perfecto para cualquier situación
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
        <Link 
          to="/chat"
          className="karius-card group p-8 flex flex-col items-center justify-center text-center hover:border-karius-purple border-2 border-transparent transition-all duration-300"
        >
          <div className="bg-karius-light-purple rounded-full p-6 mb-6 group-hover:bg-karius-purple transition-colors duration-300">
            <MessageCircle size={48} className="text-karius-dark-purple group-hover:text-white transition-colors duration-300" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-karius-dark-purple">Habla con Karitou</h2>
          <p className="text-gray-600">Nuestro asistente inteligente te ayudará a encontrar el lugar perfecto</p>
        </Link>

        <Link 
          to="/explore"
          className="karius-card group p-8 flex flex-col items-center justify-center text-center hover:border-karius-purple border-2 border-transparent transition-all duration-300"
        >
          <div className="bg-karius-light-blue rounded-full p-6 mb-6 group-hover:bg-karius-blue transition-colors duration-300">
            <Map size={48} className="text-karius-dark-purple group-hover:text-white transition-colors duration-300" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-karius-dark-purple">Explorar lugares</h2>
          <p className="text-gray-600">Descubre recomendaciones personalizadas basadas en tus preferencias</p>
        </Link>
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          © 2025 Karius - Descubre el lugar perfecto
        </p>
      </div>
    </div>
  );
};

export default Index;
