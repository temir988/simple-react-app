import styles from "./ErrorIndicator.module.css";

function ErrorIndicator({ modClass }) {
  return (
    <div className={`${styles.error} ${modClass}`}>
      <div className={styles.title}>Oops!</div>
      <div className={styles.text}>Something went wrong :(</div>
    </div>
  );
}

export default ErrorIndicator;
