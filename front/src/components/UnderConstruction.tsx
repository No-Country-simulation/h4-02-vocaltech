import React from 'react';

const UnderConstruction: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 text-center font-sans ml-10">
      <div className="text-6xl">🚧</div>
      <h2 className="text-2xl font-bold mt-4">Página en construcción</h2>
      <p className="text-lg text-gray-600 mt-2">Estamos trabajando para mejorar la experiencia. ¡Vuelve pronto!</p>
    </div>
  );
};

export default UnderConstruction;
