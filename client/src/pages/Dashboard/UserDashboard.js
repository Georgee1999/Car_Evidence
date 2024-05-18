import React, { useState, useEffect } from "react";
import {
  mainContainerStyle,
  bodyStyle,
  carContainerStyle,
} from "../../styles/styles";
import ActionButtons from "../../components/ActionButtons";
import Modals from "../../components/Modals";
import CarCard from "../../components/Car/CarCard";
import { useUser } from "../../context/UserContext";
import { useCarFetcher } from "../../components/Car/CarFetcher";

export function UserDashboard() {
  const { user } = useUser();
  const { fetchAllCars, fetchCarsByEmail } = useCarFetcher();

  const [userCars, setUserCars] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [emailModalIsOpen, setEmailModalIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [hoveredButton, setHoveredButton] = useState(null);



  useEffect(() => {
    if (user) {
      console.log("User exists, fetching all cars...");
      fetchAllCars().then(setUserCars);
    }
  }, [user, fetchAllCars]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openDeleteModal = () => setDeleteModalIsOpen(true);
  const closeDeleteModal = () => setDeleteModalIsOpen(false);
  const openEmailModal = () => setEmailModalIsOpen(true);
  const closeEmailModal = () => setEmailModalIsOpen(false);

  const handleAllCarsClick = async () => {
    const cars = await fetchAllCars();
    setUserCars(cars);
  };  
  
  const handleEmailSubmit = async (email) => {
    try {
      const cars = await fetchCarsByEmail(email);
      setUserCars(cars);
      return cars;
    } catch (error) {
      console.error("Error fetching cars by email:", error);
      return [];
    }
  };

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
        <ActionButtons
          openModal={openModal}
          openDeleteModal={openDeleteModal}
          handleAllCarsClick={handleAllCarsClick}
          openEmailModal={openEmailModal}
          hoveredButton={hoveredButton}
          setHoveredButton={setHoveredButton}
        />
        <div style={carContainerStyle}>
          {userCars && userCars.length > 0 ? (
            userCars.map((car, index) => (
              <CarCard
                key={index}
                car={car}
                index={index}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))
          ) : (
            <p>Nemáš přiřazená žádná vozidla</p>
          )}
        </div>
        <Modals
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          handleAddCarSuccess={handleAddCarSuccess}
          deleteModalIsOpen={deleteModalIsOpen}
          closeDeleteModal={closeDeleteModal}
          handleDeleteCarSuccess={handleDeleteCarSuccess}
          emailModalIsOpen={emailModalIsOpen}
          closeEmailModal={closeEmailModal}
          handleEmailSubmit={handleEmailSubmit}
        />
      </div>
    </div>
  );
}

export default UserDashboard;
