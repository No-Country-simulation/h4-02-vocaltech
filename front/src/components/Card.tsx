import React from "react";
import '../App.css'

type CardProps = {
  title: string;
  text: string;
  className: string;
};

const Card: React.FC<CardProps> = ({ title, text, className }) => {
  return (
    <div className={`${className} flex-col w-2/6 m-px p-5 text-white rounded-xl text-center`}>
      <h4 className="font-bold text-white text-xl mb-7 mt-3">{title}</h4>
      <p className="">{text}</p>
    </div>
  );
};

export default Card;
