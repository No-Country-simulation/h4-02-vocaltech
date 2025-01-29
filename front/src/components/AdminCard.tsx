import React from "react";

type CardProps ={
    title: string,
    content: string,
    className?: string
  }

const AdminCard: React.FC<CardProps> = ({ title, content, className }) => {
  return (
    <div className={className}>
      <p>{title}</p>
      <p className="text-3xl">{content}</p>
    </div>
  );
};

export default AdminCard;
