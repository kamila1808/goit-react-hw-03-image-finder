import styles from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ nextPage }) => {
  return (
    <div className={styles.Container}>
    <button type="button" className={styles.Button} onClick={nextPage}>
      Load more
    </button>
    </div>

  );
}

Button.propTypes = {
  nextPage: PropTypes.func.isRequired,
};
