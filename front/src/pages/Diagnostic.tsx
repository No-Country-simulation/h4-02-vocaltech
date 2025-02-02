import React from "react";
import DiagnosticForm from "../components/DiagnosticForm";

const Diagnostic = () => {
  return (
    <div className="bg-slate-300">
      <div className="text-center p-10">
        <h1 className="font-bold text-black mb-5 text-2xl">
          Descubre el potencial de tu comunicación y liderazgo
        </h1>
        <p className="text-black">
          Completa este breve diagnóstico y obtén recomendaciones personalizadas
          para transformar tus habilidades, ya seas emprendedor o empresa.
          ¡Estamos aquí para ayudarte a alcanzar el éxito que mereces!
        </p>
      </div>
      <DiagnosticForm />
    </div>
  );
};
export default Diagnostic;