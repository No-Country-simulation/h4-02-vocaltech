import React from "react";
import Carrousel from "../../components/Carrousel";
import FeedbackCard from "../../components/FeedbackCard";
import Card from "../../components/Card";
import { Link } from "react-router-dom";
import "./entrepreneurs.css";
import Footer from "../../components/Footer";

const entrepreneurs = () => {
  type CardProps = {
    title: string;
    text: string;
    className?: string;
  };
  return (
    <div className="bcbody flex flex-col">
      <div className="flex flex-col justify-center items-center p-20 lg:p-40">
        <h1 className="font-bold text-center text-3xl mb-12">
          Empodera a los emprendedores con VocalTech
        </h1>
        <p className="text-justify">
          Los emprendedores enfrentan obstáculos que limitan su éxito, como la
          inseguridad al presentar ideas y la dificultad para estructurar pitchs
          convincentes que atraigan clientes e inversores. La falta de
          habilidades en storytelling y comunicación efectiva reduce su
          capacidad para conectar con el público. Además, carecen de acceso a
          recursos clave para validar sus ideas en el mercado y construir MVPs
          funcionales, enfrentándose a altos costos, tiempos prolongados y
          riesgos en el desarrollo. Estos desafíos dificultan transformar sus
          ideas en negocios sostenibles y competitivos.
        </p>
      </div>
      <Carrousel />
      <div className="flex flex-col justify-center items-center p-20 lg:p-40">
        <h4 className="font-bold text-center text-2xl mb-12">
          Nuestra solución
        </h4>
        <p className="text-justify">
          Descubre cómo los servicios de VocalTech pueden ayudarte a superar los
          desafíos que enfrentan los emprendedores.
        </p>
      </div>
      <div className="cards flex flex-col items-center justify-around mx-8 my-9 pb-10 md:flex-row md:items-stretch">
        <Card
          title="Entrenamiento personalizado"
          text="Sesiones a medida para perfeccionar tus habilidades de oratoria y storytelling.
Ideal para presentaciones de pitch y captación de inversores."
          className=""
        />
        <Card
          title="Coaching individual"
          text="Comunicación efectiva que impulse tu negocio.
        Sesiones personalizadas enfocadas en storytelling, pitch y liderazgo vocal."
          className=""
        />
        <Card
          title="Validación de Mercado"
          text="Obtén retroalimentación y valida tu idea en una comunidad de 30,000 miembros."
          className=""
        />

        <Card
          title="Equipos Tech Validados"
          text="Colabora con talento junior productivo para el desarrollo de tu MVP."
          className=""
        />
        <Card
          title="Reducción de Riesgos"
          text="Minimiza costos y tiempos en el desarrollo de tu idea."
          className=""
        />
      </div>
      <div className="flex flex-col justify-center items-center p-20 lg:p-40">
        <h4 className="font-bold text-center text-2xl mb-12">
          Testimonios de Emprendedores
        </h4>
        <p className="text-justify">
          Descubre lo que dicen los emprendedores que han utilizado los
          servicios de VocalTech para impulsar sus proyectos.
        </p>
        <div>
          <FeedbackCard />
          <FeedbackCard />
          <FeedbackCard />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-20 lg:p-40">
        <h3 className="font-bold text-center text-2xl mb-12">
          ¡Potencia tu emprendimiento con VocalTech!
        </h3>
        <button className="bg-anaranjado px-5 py-2 rounded text-white hover:brightness-110 transition">
          Registrarse
        </button>
      </div>
      <div className="bg-azul-claro">
        <Footer />
      </div>
    </div>
  );
};

export default entrepreneurs;
