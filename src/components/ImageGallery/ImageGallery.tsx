import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

interface Photo {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

interface ImageGalleryProps {
  photos: Photo[];
  openModal: (photo: Photo) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ photos, openModal }) => {
  return (
    <div className={css.gallery}>
      <ul className={css.list}>
        {photos.map((photo) => (
          <ImageCard key={photo.id} photo={photo} openModal={openModal} />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
