import styles from "./Modal.module.css";
import { ReactComponent as CloseIcon } from "./close.svg";

function Modal({ isOpen, item, handleModalClose }) {
  return (
    <>
      <div
        className={`${styles.overlay} ${isOpen ? styles.active : ""}`}
        onClick={handleModalClose}
      />
      <div className={`${styles.wrapper} ${isOpen ? styles.active : ""}`}>
        <div className={styles.modal}>
          <button className={styles.close} onClick={handleModalClose}>
            <CloseIcon />
          </button>
          <div className={styles.photo}>
            <img src="https://picsum.photos/id/237/600/400" alt="" />
          </div>
          <div className={styles.form}>
            <form action="">
              <input
                type="text"
                className={styles.control}
                placeholder="Ваше имя"
              />
              <input
                type="text"
                className={styles.control}
                placeholder="Ваш комментарий"
              />
              <button
                type="submit"
                className={`${styles.control} ${styles.submit}`}
              >
                Оставить комментарий
              </button>
            </form>
          </div>
          <ul className={styles.comments}>
            <li className={styles.comment}>
              <div className={styles.date}>19.04.2012</div>
              <div className={styles.commentText}>Отличное фото</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Modal;
