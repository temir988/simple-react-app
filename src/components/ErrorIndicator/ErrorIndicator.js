import styles from "./ErrorIndicator.module.css";

function ErrorIndicator() {
  return (
    <div className={styles.error}>
      <div className={styles.title}>Oops!</div>
      <div className={styles.text}>Something went wrong :(</div>
    </div>
  );
}

export default ErrorIndicator;
