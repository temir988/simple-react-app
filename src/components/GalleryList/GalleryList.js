import { useState, useEffect } from "react";
import GalleryItem from "../GalleryItem/GalleryItem";
import Modal from "../Modal/Modal";
import styles from "./GalleryList.module.css";

function GalleryList() {
  const [photos, setPhotos] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [activeItemData, setActiveItemData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  // useEffect(() => {
  //   if (!activeItem) return;
  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `https://boiling-refuge-66454.herokuapp.com/images/${activeItem}`
  //     );
  //     const data = await response.json();
  //     setActiveItemData(data);
  //
  //   };
  //
  //   fetchData();
  // }, [activeItem]);

  const handleClick = (id) => {
    setActiveItem(id);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <ul className={styles.list}>
        {photos.map((photo) => (
          <GalleryItem key={photo.id} photo={photo} handleClick={handleClick} />
        ))}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        item={activeItemData}
        handleModalClose={handleModalClose}
      />
    </>
  );
}

export default GalleryList;
