import React from "react";
import tuvoz from "../assets/img-tuvoz.jpeg";
import nocountry from "../assets/img-nocountry.png";

const aboutUs = () => {
  return (
    <div className="py-24 px-10">
      <div className="mb-8 text-center ">
        <h2 className="font-bold mb-4 text-4xl ">¿Quienes somos?</h2>
        <p>
          En Vocaltech, somos el resultado de una alianza estratégica entre No
          Country y Vos y Tu Voz, uniendo fuerzas para crear un espacio donde la
          comunicación y la tecnología se encuentren al servicio de
          emprendedores y empresas.
        </p>
        <hr className="mt-8 border-black" />
      </div>
      <div className="flex flex-col justify-center gap-8 md:flex-row">
        <div className="flex flex-col w-full">
          <h5 className="text-h5 font-bold mb-4">Mision</h5>
          <p className="text-justify">
            Apoyar a emprendedores y empresas en su camino al éxito,
            enfocándonos en los pilares fundamentales: comunicación y
            tecnología. A través de un enfoque estratégico y personalizado,
            realizamos diagnósticos que nos permiten identificar necesidades
            específicas y brindar soluciones efectivas que impulsen su
            crecimiento.
          </p>
          <div className="flex justify-center items-center ">
            <img
              className="rounded-xl mt-5 max-h-52"
              src={tuvoz}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <h5 className="text-h5 font-bold mb-4">Vision</h5>
          <p className="text-justify">
            Creemos en el poder del conocimiento y la colaboración para
            construir un futuro innovador y dinámico. Queremos empoderar a todos
            nuestros leads, difundiendo oportunidades y fortaleciendo el poder
            de la voz para impactar positivamente en la comunidad global.
          </p>
          <div className="flex justify-center items-center">
            <img className="rounded-xl mt-5 max-h-52" src={nocountry} alt="" />
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <h5 className="font-bold mb-4">Lorem Ipsum is simply dummy</h5>
        <p>
          Welcome to Burger Bliss, where we take your cravings to a whole new
          level! Our mouthwatering burgers are made from 100% beef and are
          served on freshly baked buns.
        </p>
      </div>
    </div>
  );
};

export default aboutUs;
