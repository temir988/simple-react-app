import styles from "./ModalForm.module.css";
import { useState } from "react";

function ModalForm({ itemId, addComment }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    setHasError(false);

    try {
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

      if (!response.ok) {
        setHasError(true);
        return;
      }

      const newComment = {
        id: Math.random() * Date.now(),
        text: comment,
        date: Date.now(),
      };
      addComment(newComment);

      setName("");
      setComment("");
    } catch (e) {
      console.error(e);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.form}>
      {hasError && <div className={styles.error}>Error! Try Again</div>}
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
          disabled={name === "" || comment === "" || isLoading}
          className={`${styles.control} ${styles.submit}`}
        >
          Оставить комментарий
        </button>
      </form>
    </div>
  );
}

export default ModalForm;
