import React from "react";
import { Link } from "react-router-dom";

const Ready = () => {
  return (
    <div className="bg-primary_50 flex flex-col items-center justify-center gap-8 p-12 px-4">
      <div className="text-center">
        <p className="text-primary_300 font-bold text-3xl">
          Hablar con <span className="text-secondary_600">impacto</span> abre
        </p>
        <p className="text-primary_300 font-bold text-3xl">
          puertas. ¿Estás listo?
        </p>
      </div>
      <p className="text-primary_300">
        Selecciona tu perfil y da el primer paso
      </p>
      <div className="flex gap-4">
        <Link to="/empresas" style={{ textDecoration: "none" }}>
          <button className="bg-secondary_600 px-5 py-2 rounded text-blanco_300 hover:brightness-110 transition">
            Soy Empresa
          </button>
        </Link>
        <Link to="/emprendedores" style={{ textDecoration: "none" }}>
          <button className="bg-primary_400 px-5 py-2 rounded text-blanco_300 hover:brightness-110 transition">
            Soy Emprendedor
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Ready;
