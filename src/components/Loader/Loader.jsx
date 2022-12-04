import { Watch } from 'react-loader-spinner';
import styles from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={styles.Loader}>
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#4fa94d"
        ariaLabel="watch-loading"
        wrapperStyle
        wrapperClassName
        visible={true}
      />
    </div>
  );
};
