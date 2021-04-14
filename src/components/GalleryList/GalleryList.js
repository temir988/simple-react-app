import GalleryItem from "../GalleryItem/GalleryItem";
import styles from "./GalleryList.module.css";

function GalleryList({ photos, handleClick }) {
  return (
    <ul className={styles.list}>
      {photos.map((photo) => (
        <GalleryItem key={photo.id} photo={photo} handleClick={handleClick} />
      ))}
    </ul>
  );
}

export default GalleryList;
