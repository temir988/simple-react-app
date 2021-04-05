import styles from "./GalleryItem.module.css";

function GalleryItem(props) {
  return (
    <li
      className={styles.item}
      onClick={() => props.handleClick(props.photo.id)}
    >
      <img
        src={props.photo.url}
        // srcSet="https://picsum.photos/id/237/600/400 2x"
        className={styles.img}
        alt=""
      />
    </li>
  );
}

export default GalleryItem;
