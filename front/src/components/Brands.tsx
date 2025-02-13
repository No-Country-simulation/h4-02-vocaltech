import React from "react";

const Brands = () => {
  return (
    <div className="text-center mt-16">
      <p className="font-bold text-xl lg:text-2xl text-primary_400">
        Empresas que confiaron en nosotros
      </p>
      <div className="flex justify-center lg:flex-row gap-12 items-center mt-6">
        <div className="flex flex-col lg:flex-row justify-center gap-12 items-center mt-6">
          <img src="/buffer.png" alt="brand" className="h-6 lg:h-8" />
          <img src="/dropbox.png" alt="brand" className="h-6 lg:h-8" />
          <img src="/framer.png" alt="brand" className="h-6 lg:h-8" />
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-12 items-center mt-6">
          <img src="/hubspot.png" alt="brand" className="h-6 lg:h-8" />
          <img src="/netflix.png" alt="brand" className="h-6 lg:h-8" />
          <img src="/stripe.png" alt="brand" className="h-6 lg:h-8" />
        </div>
      </div>
    </div>
  );
};

export default Brands;
