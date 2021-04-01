import styles from "./Modal.module.css";

function Modal({ isOpen }) {
  return (
    <div className={`${styles.wrapper} ${isOpen ? styles.active : ""}`}>
      <div className={styles.modal}>
        <h4>Modal title</h4>
      </div>
    </div>
  );
}

export default Modal;
