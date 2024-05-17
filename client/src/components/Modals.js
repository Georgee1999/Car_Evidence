import React from "react";
import Modal from "react-modal";
import AddCarForm from "./Car/AddCarForm";
import DeleteCarForm from "./Car/DeleteCarForm";
import FindCarsByEmailForm from "./Car/FindCarsByEmailForm";
import {
  registrationPopup
} from "../styles/styles";


const Modals = ({
  modalIsOpen,
  closeModal,
  handleAddCarSuccess,
  deleteModalIsOpen,
  closeDeleteModal,
  handleDeleteCarSuccess,
  emailModalIsOpen,
  closeEmailModal,
  handleEmailSubmit,
}) => {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={registrationPopup}
        contentLabel="Přidat auto"
      >
        <AddCarForm
          onClose={closeModal}
          onAddCarSuccess={handleAddCarSuccess}
        />
      </Modal>
      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={closeDeleteModal}
        style={registrationPopup}
        contentLabel="Smazat auto"
      >
        <DeleteCarForm
          onClose={closeDeleteModal}
          onDeleteCarSuccess={handleDeleteCarSuccess}
        />
      </Modal>
      <Modal
        isOpen={emailModalIsOpen}
        onRequestClose={closeEmailModal}
        style={registrationPopup}
        contentLabel="Vyhledat auta podle emailu"
      >
        <FindCarsByEmailForm onClose={closeEmailModal} onEmailSubmit={handleEmailSubmit} />
      </Modal>
    </>
  );
};

export default Modals;
