import React from "react";
import Modal from "react-modal"
import AddCarForm from "../components/Car/AddCarForm";
import DeleteCarForm from "../components/Car/DeleteCarForm";
import FindCarsByEmail from "./Car/FindCarsByEmailForm"
import { registrationPopup } from "../styles/styles";

const Modals = ({
  modalIsOpen,
  closeModal,
  handleAddCarSuccess,
  deleteModalIsOpen,
  closeDeleteModal,
  handleDeleteCarSuccess,
  emailModalIsOpen,
  closeEmailModal,
  handleEmailSubmit
}) => {
  return (
    <>
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
      <Modal
        isOpen={emailModalIsOpen}
        onRequestClose={closeEmailModal}
        contentLabel="Email Form"
        style={registrationPopup}
      >
        <FindCarsByEmail onClose={closeEmailModal} onEmailSubmit={handleEmailSubmit} />
      </Modal>
    </>
  );
};

export default Modals;
