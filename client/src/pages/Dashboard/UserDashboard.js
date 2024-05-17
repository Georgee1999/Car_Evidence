import React, { useState, useEffect, useCallback } from "react";
import {
  mainContainerStyle,
  bodyStyle,
  carContainerStyle,
} from "../../styles/styles";
import ActionButtons from "../../components/ActionButtons";
import Modals from "../../components/Modals";
import CarCard from "../../components/Car/CarCard";

import { useUser } from "../../context/UserContext";
import { getUserCars, getCarList, getCarsByEmail } from "../../api/api";

export function UserDashboard() {
  const { user } = useUser();
  const userId = user?.id || "";
  const [userCars, setUserCars] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [emailModalIsOpen, setEmailModalIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [hoveredButton, setHoveredButton] = useState(null);


  const fetchUserCars = useCallback(async () => {
    try {
      const cars = await getUserCars(userId);
      const sortedCars = cars.sort((a, b) => b.yearOfMade - a.yearOfMade);

      console.log("Fetched cars:", sortedCars);
      setUserCars(sortedCars || []);
    } catch (error) {
      console.error("Error fetching user cars:", error);
    }
  }, [userId]);

  const fetchAllCars = useCallback(async () => {
    try {
      const cars = await getCarList();
      const sortedCars = cars.sort((a, b) => b.yearOfMade - a.yearOfMade);

      console.log("Fetched all cars:", sortedCars);
      setUserCars(sortedCars || []);
    } catch (error) {
      console.error("Error fetching all cars:", error);
    }
  }, []);

 

  const fetchCarsByEmail = useCallback(async (email) => {
    try {
      const cars = await getCarsByEmail(email);
      const sortedCars = cars.sort((a, b) => b.yearOfMade - a.yearOfMade);

      console.log("Fetched cars by email:", sortedCars);
      setUserCars(sortedCars || []);
    } catch (error) {
      console.error("Error fetching cars by email:", error);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserCars();
    }
  }, [fetchUserCars, userId]);


  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const openDeleteModal = () => setDeleteModalIsOpen(true);
  const closeDeleteModal = () => setDeleteModalIsOpen(false);
  const openEmailModal = () => setEmailModalIsOpen(true);
  const closeEmailModal = () => setEmailModalIsOpen(false);

  //const handleMyCarsClick = () => fetchUserCars();
  const handleAllCarsClick = () => fetchAllCars();
  const handleEmailSubmit = (email) => fetchCarsByEmail(email);

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
