import { useState, useEffect } from "react";
import { ReactComponent as CloseIcon } from "./close.svg";
import Loader from "../Loader/Loader";
import ModalComment from "../ModalComment/ModalComment";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import styles from "./Modal.module.css";

function Modal({ isOpen, itemId, handleModalClose }) {
  const [itemData, setItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
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

  const inputNameHandler = (event) => {
    setName(event.target.value);
  };

  const inputCommentHandler = (event) => {
    setComment(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = {
      name,
      comment,
    };

    const response = await fetch(
      `https://boiling-refuge-66454.herokuapp.com/images/${itemId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Network error");

    const newComment = {
      id: Math.random() * Date.now(),
      text: comment,
      date: Date.now(),
    };
    setItemData((state) => ({
      ...state,
      comments: [newComment, ...state.comments],
    }));

    setName("");
    setComment("");
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
              <div className={styles.form}>
                <form onSubmit={submitHandler}>
                  <input
                    type="text"
                    className={styles.control}
                    placeholder="Ваше имя"
                    onInput={inputNameHandler}
                    value={name}
                    required
                  />
                  <input
                    type="text"
                    className={styles.control}
                    placeholder="Ваш комментарий"
                    onInput={inputCommentHandler}
                    value={comment}
                    required
                  />
                  <button
                    type="submit"
                    disabled={name === "" || comment === ""}
                    className={`${styles.control} ${styles.submit}`}
                  >
                    Оставить комментарий
                  </button>
                </form>
              </div>
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
