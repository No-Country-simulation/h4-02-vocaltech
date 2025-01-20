import React from "react";
import { FaStar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const Review = () => {
  return (
    <div className="flex flex-col my-3 w-full sm:w-full lg:w-1/3 p-3 sm:p-6 lg:p-6">
      <div className="flex text-orange-200">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
      <p className="my-4">
        “Lorem ipsum dolor sit amet dolor sit consectetur eget maecenas sapien
        fusce egestas risus purus suspendisse turpis volutpat onare”
      </p>
      <div className="flex">
        <CgProfile className="text-5xl mr-2"/>
        <div className="flex flex-col">
          <p className="font-semibold">Nombre</p>
          <p className="font-extralight text-slate-400 text-xs mt-0">CEO & Founder</p>
        </div>
      </div>
    </div>
  );
};

export default Review;