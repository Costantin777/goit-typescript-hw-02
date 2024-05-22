import { useState, useEffect } from 'react';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { SearchBox } from './SearchBar/SearchBar';
import ImageModal from './ImageModal/ImageModal';
import { Toaster } from 'react-hot-toast';
import { fetchData } from './API';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';

type Photo = {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
};

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const searchPhotos = async (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setPhotos([]);
  };

  const loadMore = () => {
    setPage(page + 1);
    setTimeout(() => {
      const scrollDistance = window.innerHeight;
      window.scrollBy({
        top: scrollDistance,
        behavior: "smooth"
      });
    }, 500);
  };

  const openModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchDataAndHandleLoading = async () => {
      if (query === '') {
        return;
      }
  
      setLoading(true);
      try {
        await fetchData({ query, page, setPhotos, setLoading, setError });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchDataAndHandleLoading();
  }, [query, page]);

  return (
    <>
      <SearchBox onSearch={searchPhotos} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {photos.length > 0 && <ImageGallery photos={photos} openModal={openModal} />}
      {photos.length > 0 && <LoadMoreBtn loadMore={loadMore} />}
      <ImageModal isOpen={modalIsOpen} onRequestClose={closeModal} selectedPhoto={selectedPhoto} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
