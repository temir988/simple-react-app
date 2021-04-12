import styles from "./ModalComment.module.css";

function ModalComment({ date, text }) {
  return (
    <li className={styles.comment}>
      <div className={styles.date}>
        {new Date(date).toLocaleDateString("ru-RU")}
      </div>
      <div className={styles.commentText}>{text}</div>
    </li>
  );
}

export default ModalComment;
