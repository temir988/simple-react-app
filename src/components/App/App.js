import { useEffect, useState } from "react";
import GalleryList from "../GalleryList/GalleryList";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import ErrorIndicator from "../ErrorIndicator/ErrorIndicator";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://boiling-refuge-66454.herokuapp.com/imagesdsdfsd"
        );
        if (response.ok) {
          const data = await response.json();
          setPhotos(data);
        } else {
          throw new Error("bad request");
        }
      } catch (e) {
        console.log(e);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
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
        {hasError && <ErrorIndicator />}
        {isLoading ? (
          <div className="loader">
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
