import Modal from 'react-modal';

const customStyles: Modal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'zoom-out',
  },
};

Modal.setAppElement('#root');

interface Photo {
  urls: {
    regular: string;
  };
}

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedPhoto: Photo | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, selectedPhoto }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      {selectedPhoto && (
        <img onClick={onRequestClose} src={selectedPhoto.urls.regular} alt="Selected" />
      )}
    </Modal>
  );
};

export default ImageModal;
