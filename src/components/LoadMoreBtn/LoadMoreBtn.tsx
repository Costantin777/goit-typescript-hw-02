import React from "react";
import PropTypes from "prop-types";
import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ loadMore }) => (
  <button id="loadMore" onClick={loadMore} className={css.btn} type="button">
    Завантажити ще
  </button>
);

LoadMoreBtn.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
