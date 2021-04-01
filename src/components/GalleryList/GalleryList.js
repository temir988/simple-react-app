import { useState, useEffect } from "react";
import GalleryItem from "../GalleryItem/GalleryItem";
import Modal from "../Modal/Modal";
import styles from "./GalleryList.module.css";

function GalleryList() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://boiling-refuge-66454.herokuapp.com/images"
      );
      const data = await response.json();
      setPhotos(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Modal />
      <ul className={styles.list}>
        {photos.map((photo) => (
          <GalleryItem key={photo.id} photo={photo} />
        ))}
      </ul>
    </>
  );
}

export default GalleryList;
