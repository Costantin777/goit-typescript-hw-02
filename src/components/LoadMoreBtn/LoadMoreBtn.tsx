import React from "react";
import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  handleLoadMoreBtnClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({
  handleLoadMoreBtnClick,
}) => {
  return (
    <div className={css.seeMoreBtnWrapper}>
      <button
        className={css.seeMoreBtn}
        type="button"
        onClick={handleLoadMoreBtnClick}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
