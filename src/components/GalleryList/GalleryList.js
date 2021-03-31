import styles from "./GalleryList.module.css";
import GalleryItem from "../GalleryItem/GalleryItem";

function GalleryList() {
  return (
    <ul className={styles.list}>
      <GalleryItem />
      <GalleryItem />
      <GalleryItem />
      <GalleryItem />
      <GalleryItem />
      <GalleryItem />
    </ul>
  );
}

export default GalleryList;
