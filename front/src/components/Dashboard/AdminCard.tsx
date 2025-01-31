import React, { useEffect, useState } from "react";

type CardProps ={
    title: string,
    content: string,
    className?: string
  }

  type Lead = {
    id: string;
    type: string;
  };

const AdminCard: React.FC<CardProps> = ({ title, content, className }) => {
  return (
    <div className={className}>
      <p className="break-words">{title}</p>
      <p className="text-3xl">{content}</p>
    </div>
  );
};

export default AdminCard;
