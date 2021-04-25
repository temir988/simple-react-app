import { useState, useEffect } from "react";
import { ReactComponent as CloseIcon } from "./close.svg";
import Loader from "../Loader/Loader";
import ModalComment from "../ModalComment/ModalComment";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import styles from "./Modal.module.css";
import ModalForm from "../ModalForm/ModalForm";

function Modal({ isOpen, itemId, handleModalClose }) {
  const [itemData, setItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!itemId) return;

    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://boiling-refuge-66454.herokuapp.com/images/${itemId}`
        );

        if (response.ok) {
          const data = await response.json();
          setItemData(data);
        } else {
          setHasError(true);
        }
      } catch (e) {
        console.error(e);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      setItemData(null);
      setHasError(false);
    };
  }, [itemId]);

  const addComment = (newComment) => {
    setItemData((state) => ({
      ...state,
      comments: [newComment, ...state.comments],
    }));
  };

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

          {hasError ? (
            <ErrorIndicator modClass={styles.error} />
          ) : isLoading ? (
            <div className={styles.loader}>
              <Loader />
            </div>
          ) : (
            <>
              <div className={styles.photo}>
                {itemData && (
                  <img src={itemData.url} width="330" height="220" alt="" />
                )}
              </div>

              <ModalForm itemId={itemId} addComment={addComment} />

              <ul className={styles.comments}>
                {itemData && itemData.comments.length !== 0 ? (
                  itemData.comments.map(({ id, text, date }) => (
                    <ModalComment key={id} date={date} text={text} />
                  ))
                ) : (
                  <li className={styles.comment}>Комментариев пока нет</li>
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;
