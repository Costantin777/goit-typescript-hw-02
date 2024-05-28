import React from "react";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  id: string;
  alt: string;
  url: string;
  openModal: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ id, alt, url, openModal }) => {
  const handleClick = () => {
    openModal(id);
  };

  return (
    <div>
      <img
        onClick={handleClick}
        className={css.listImage}
        src={url}
        alt={alt}
      />
    </div>
  );
};

export default ImageCard;
