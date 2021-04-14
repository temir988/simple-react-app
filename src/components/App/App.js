import { useEffect, useState } from "react";
import GalleryList from "../GalleryList/GalleryList";
import "./App.css";
import styles from "../GalleryList/GalleryList.module.css";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";

function App() {
  const [photos, setPhotos] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://boiling-refuge-66454.herokuapp.com/images"
      );
      const data = await response.json();
      setPhotos(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleClick = (id) => {
    setActiveItem(id);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="App">
      <header className="header">TEST APP</header>
      <main className="main">
        {isLoading ? (
          <div className={styles.loader}>
            <Loader />
          </div>
        ) : (
          <GalleryList photos={photos} handleClick={handleClick} />
        )}
        <Modal
          isOpen={modalIsOpen}
          itemId={activeItem}
          handleModalClose={handleModalClose}
        />
      </main>
      <footer className="footer">&#169; 2018-2021</footer>
    </div>
  );
}

export default App;
