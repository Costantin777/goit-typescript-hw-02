import React from "react";
import css from "./Loader.module.css";
import { Blocks } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <div className={css.loaderWrapper}>
      <Blocks
        height={80}
        width={80}
        color="#17a9e3"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClassName="blocks-wrapper"
        visible
      />
    </div>
  );
};

export default Loader;
