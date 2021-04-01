import styles from "./GalleryList.module.css";
import GalleryItem from "../GalleryItem/GalleryItem";
import Modal from "../Modal/Modal";

function GalleryList() {
  return (
    <>
      <Modal isOpen={true} />
      <ul className={styles.list}>
        <GalleryItem />
        <GalleryItem />
        <GalleryItem />
        <GalleryItem />
        <GalleryItem />
        <GalleryItem />
      </ul>
    </>
  );
}

export default GalleryList;
