import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchPhotos from "./fetchPhotos"; // Assuming you have this function implemented
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage"; // Corrected import path
import Loader from "./components/Loader/Loader";

import "./App.css";

interface Photo {
  id: number;
  // Add other properties relevant to your Photo type
}

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Photo | null>(null);

  useEffect(() => {
    async function searchPictures() {
      if (query === "") {
        return;
      }
      setError(false);
      setLoading(true);
      try {
        const apiRequest = await fetchPhotos(query, page);
        setPhotos((prevState) => [...prevState, ...apiRequest]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    searchPictures();
  }, [query, page]);

  function onFormSubmit(searchedWord: string) {
    if (query.toLowerCase() !== searchedWord.toLowerCase()) {
      setPhotos([]);
      setQuery(searchedWord);
    }
    setPage(1);
  }

  function handleLoadMoreBtnClick() {
    setPage((prevState) => prevState + 1);
    setLoading(true);
  }

  function openModal(id: number) {
    setIsOpen(true);
    const selectedPhoto = photos.find((photo) => photo.id === id);
    setModalData(selectedPhoto || null);
  }

  function closeModal() {
    setIsOpen(false);
    setModalData(null);
  }

  return (
    <>
      <SearchBar onFormSubmit={onFormSubmit} />
      <main>
        <ImageGallery openModal={openModal} photos={photos} />
        {error && <ErrorMessage />}
        {loading && <Loader />}
        {photos.length > 0 && !loading && (
          <LoadMoreBtn handleLoadMoreBtnClick={handleLoadMoreBtnClick} />
        )}
        {modalData && (
          <ImageModal
            modalContent={modalData}
            isOpen={modalIsOpen}
            closeModal={closeModal}
          />
        )}
      </main>
    </>
  );
};

export default App;
