import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate, Outlet } from "react-router-dom";
import RegistrationForm from "./User/RegistrationForm"; 
import NavBar from "./NavBar";

import {
  registrationPopup,
  mainContainerStyle,
  buttonStyle,
  bodyStyle,
  footerStyle,
} from "./styles";



const Layout = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // Nový stav pro jméno uživatele
  const navigate = useNavigate();


  Modal.setAppElement("#root");



  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRegistrationSuccess = (name) => {
    setIsLoggedIn(true);
    setUserName(name); // Nastavení jména uživatele po úspěšné registraci
    navigate("/dashboard"); // Přesměrování na Dashboard po úspěšné registraci
    closeModal();
  };

  const onLogout = () => {
    setIsLoggedIn(false);  // Nastaví isLoggedIn na false
    setUserName(""); // Vyprázdnění jména uživatele po odhlášení
    navigate("/");         // Přesměrování na úvodní stránku
  };


  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} userName={userName} />
      <div style={mainContainerStyle}>
        <div style={bodyStyle}>
          {!isLoggedIn ? (
            <>
              <button onClick={() => {}} style={buttonStyle}>Přihlásit se</button>
              <button onClick={openModal} style={buttonStyle}>Registrovat</button>
            </>
          ) : (
            // Pokud je uživatel přihlášen
            <div><Outlet /></div>
          )}
          <Modal 
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Registration Form"
            style={registrationPopup}
          >
            <RegistrationForm
              onClose={closeModal}
              onRegisterSuccess={(name) => handleRegistrationSuccess(name)}
            />
          </Modal>
        </div>
        <div className="card-footer text-light" style={footerStyle}>
          © Kvarda Jiří
        </div>
      </div>
    </>
  );
};


export default Layout;
