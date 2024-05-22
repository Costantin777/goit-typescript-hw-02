import { ProgressBar } from "react-loader-spinner";
import css from './Loader.module.css';

export const Loader: React.FC = () => {
  return (
    <div className={css.loader}>
      <div className={css.progressBar}>
        <ProgressBar
          visible={true}
          height={200}
          width={100}
          borderColor="#3747ac"
          ariaLabel="progress-bar-loading"
        />
      </div>
    </div>
  );
};

export default Loader;
