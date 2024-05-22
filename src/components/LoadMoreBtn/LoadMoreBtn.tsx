import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  loadMore: () => void;
}

export const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ loadMore }) => {
  return (
    <button id="loadMore" onClick={loadMore} className={css.btn} type="button">
      Load More
    </button>
  );
};

export default LoadMoreBtn;
