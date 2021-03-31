import styles from "./GalleryItem.module.css";

function GalleryItem() {
  return (
    <li className={styles.item}>
      <img
        src="https://picsum.photos/id/237/300/200"
        srcSet="https://picsum.photos/id/237/600/400 2x"
        className={styles.img}
        alt=""
      />
    </li>
  );
}

export default GalleryItem;
