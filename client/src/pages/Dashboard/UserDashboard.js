import React, { useState, useEffect, useCallback } from "react";
import {
  buttonStyle,
  mainContainerStyle,
  registrationPopup,
  bodyStyle,
  carContainerStyle,
  carCardStyle,
  carCardHoverStyle,
  buttonContainerStyle,
  buttonHoverStyle,
} from "../../styles/styles";
import AddCarForm from "../../components/Car/AddCarForm";
import DeleteCarForm from "../../components/Car/DeleteCarForm";
import { useUser } from "../../context/UserContext";
import { getUserCars } from "../../api/api";
import Modal from "react-modal";

export function UserDashboard() {
  const { user } = useUser();
  const userId = user?.id || "";
  const [userCars, setUserCars] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [hoveredButton, setHoveredButton] = useState(null);

  const fetchUserCars = useCallback(async () => {
    try {
      if (!userId) {
        console.log("User ID is not defined");
        return;
      }
      console.log("Fetching cars for user ID:", userId);
      const cars = await getUserCars(userId);
      const sortedCars = cars.sort((a, b) => b.yearOfMade - a.yearOfMade);

      console.log("Fetched cars:", sortedCars);
      setUserCars(sortedCars || []);
    } catch (error) {
      console.error("Error fetching user cars:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserCars();
    }
  }, [fetchUserCars, userId]);

  Modal.setAppElement("#root");

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openDeleteModal = () => setDeleteModalIsOpen(true);
  const closeDeleteModal = () => setDeleteModalIsOpen(false);

  const handleMyCarsClick = () => fetchUserCars();

  const handleAddCarSuccess = (newCar) => {
    setUserCars((prevCars) => {
      if (!Array.isArray(prevCars)) {
        prevCars = [];
      }
      return [...prevCars, newCar];
    });
  };

  const handleDeleteCarSuccess = (spz) => {
    setUserCars((prevCars) => prevCars.filter((car) => car.SPZ !== spz));
  };

  return (
    <div style={mainContainerStyle}>
      <div style={bodyStyle}>
        <div style={buttonContainerStyle}>
          <button
            style={{
              ...buttonStyle,
              ...(hoveredButton === "delete" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredButton("delete")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={openDeleteModal}
          >
            Smazat auto
          </button>
          <button
            onClick={openModal}
            style={{
              ...buttonStyle,
              ...(hoveredButton === "add" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredButton("add")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Nové auto
          </button>
          <button
            onClick={handleMyCarsClick}
            style={{
              ...buttonStyle,
              ...(hoveredButton === "myCars" ? buttonHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredButton("myCars")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            Moje auta
          </button>
        </div>
        <div style={carContainerStyle}>
          {userCars && userCars.length > 0 ? (
            userCars.map((car, index) => (
              <div
                key={index}
                style={{
                  ...carCardStyle,
                  ...(hoveredIndex === index ? carCardHoverStyle : {}),
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <p>
                  <strong>SPZ:</strong> {car.SPZ}
                </p>
                <p>
                  <strong>Model:</strong> {car.model}
                </p>
                <p>
                  <strong>Rok výroby:</strong> {car.yearOfMade}
                </p>
                <p>
                  <strong>Barva:</strong> {car.color}
                </p>
                <p>
                  <strong>Email:</strong> {car.email}
                </p>
              </div>
            ))
          ) : (
            <p>Nemáš přiřazená žádná vozidla</p>
          )}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Form"
          style={registrationPopup}
        >
          <AddCarForm onClose={closeModal} onAddCarSuccess={handleAddCarSuccess} />
        </Modal>
        <Modal
          isOpen={deleteModalIsOpen}
          onRequestClose={closeDeleteModal}
          contentLabel="Delete Car Form"
          style={registrationPopup}
        >
          <DeleteCarForm onClose={closeDeleteModal} onDeleteCarSuccess={handleDeleteCarSuccess} />
        </Modal>
      </div>
    </div>
  );
}

export default UserDashboard;
