import React from "react";
import Card from "../components/Card";

const Solution = () => {
  type CardProps = {
    title: string;
    text: string;
    className?: string;
  };

  return (
    <>
      <div className="solution flex-col px-16 pt-10">
        <h3 className="font-bold mb-8 text-4xl">Nuestros servicios</h3>
        <p>
          En Vocaltech, entendemos que cada proyecto y negocio tiene necesidades
          únicas. Por eso, ofrecemos soluciones diseñadas para potenciar tu
          comunicación, integrar tecnología de manera efectiva y ayudarte a
          alcanzar tus metas de forma estratégica.
        </p>
      </div>
      <div className="cards flex justify-around mx-8 my-9 gap-x-2">
        <Card
          title="Entrenamiento vocal efectivo"
          text="Mejora tu habilidad para conectar e inspirar con tu mensaje. Trabajamos en desarrollar empatía y transmitir mensajes convincentes que impulsen tanto el crecimiento individual como grupal en tu negocio."
          className="card-anaranjada"
        />
        <Card
          title="De idea a acción"
          text="Impulsamos tu negocio digital, ayudándote a integrar equipos diversos que ejecuten tu visión de manera ágil y eficiente."
          className="card-azul"
        />
        <Card
          title="Comunicación con propósito"
          text="Desarrolla un MVP funcional mientras fortaleces tus habilidades y conectas con oportunidades a través de nuestra red."
          className="card-amarilla"
        />
      </div>
    </>
  );
};

export default Solution;
