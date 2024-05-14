import { buttonStyle, mainContainerStyle, registrationPopup, bodyStyle} from "../styles";
import AddCarForm from "../Car/AddCarForm";
import { useState } from "react";
import Modal from "react-modal";



export function UserDashboard({ isLoggedIn }) {
 // console.log("FROM UserDashboard Is Logged In: ", isLoggedIn);



 const [modalIsOpen, setModalIsOpen] = useState(false);
 Modal.setAppElement("#root");
 const openModal = () => {
  setModalIsOpen(true);
};
const closeModal = () => {
  setModalIsOpen(false);
};


 
  return (
    <div style={mainContainerStyle}>
     
      <div style={bodyStyle}>
        <button style={buttonStyle}>Smazat auto</button>
        <button onClick={openModal} style={buttonStyle}>Nové auto</button>
        <button style={buttonStyle}>Vyhledat auto</button>
        <Modal
        isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Car Form"
            style={registrationPopup}
          >
            <AddCarForm
              onClose={closeModal}
            />
        </Modal>
      </div>

     
    

    </div>
  );
}

export default UserDashboard;
