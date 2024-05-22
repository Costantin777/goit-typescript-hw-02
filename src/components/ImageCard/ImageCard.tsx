import css from './ImageCard.module.css';

interface Photo {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

interface ImageCardProps {
  photo: Photo;
  openModal: (photo: Photo) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ photo, openModal }) => {
  const handleImageClick = () => {
    openModal(photo);
  };

  return (
    <li className={css.photo}>
      <img
        src={photo.urls.small}
        className={css.img}
        alt={photo.alt_description}
        onClick={handleImageClick}
      />
    </li>
  );
};

export default ImageCard;
