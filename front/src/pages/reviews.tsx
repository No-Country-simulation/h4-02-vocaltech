import React from "react";
import Review from "../components/Review-Card";

const reviews = () => {
  return (
    <div className="my-24">
      <h3 className="font-bold text-3xl text-center mb-4">Que dicen nuestros clientes?</h3>
      <div className="flex flex-col px-10 sm:space-y-4 sm:px-6 sm:mx-28 lg:flex-row lg:space-y-0 lg:space-x-6 lg:px-40 items-center">
        <Review />
        <Review />
        <Review />
      </div>
    </div>
  );
};

export default reviews;
