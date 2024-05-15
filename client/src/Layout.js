import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate, Outlet } from "react-router-dom";
import RegistrationForm from "./User/RegistrationForm"; 
import LoginForm from "./User/LoginForm";
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
  const [modalContent, setModalContent] = useState(null);
  const [userName, setUserName] = useState(""); // Nový stav pro jméno uživatele
  const [userId, setUserId] = useState(""); // Nový stav pro ID uživatele
  const navigate = useNavigate();


  Modal.setAppElement("#root");



  const openModal = (content) => {
    setModalContent(content)
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRegistrationSuccess = (name, id) => {
    setIsLoggedIn(true);
    setUserName(name); // Nastavení jména uživatele po úspěšné registraci
    setUserId(id); // Nastavení ID uživatele po úspěšné registraci
    navigate("/dashboard"); // Přesměrování na Dashboard po úspěšné registraci
    closeModal();
  };
  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUserName(`${user.firstName} ${user.lastName}`);
    setUserId(user.id);
    navigate("/dashboard");
    closeModal();
  };

  const onLogout = () => {
    setIsLoggedIn(false);  // Nastaví isLoggedIn na false
    setUserName(""); // Vyprázdnění jména uživatele po odhlášení
    setUserId("");
    navigate("/");         // Přesměrování na úvodní stránku
  };


  return (
    <>
    <NavBar isLoggedIn={isLoggedIn} onLogout={onLogout} userName={userName} />
      <div style={mainContainerStyle}>
        <div style={bodyStyle}>
          {!isLoggedIn ? (
            <>
              <button onClick={() => openModal("login")} style={buttonStyle}>Přihlásit se</button>
              <button onClick={() => openModal("register")} style={buttonStyle}>Registrovat</button>
            </>
          ) : (
            <div><Outlet context={[userId]} /></div>
          )}
           <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Modal"
            style={registrationPopup}
          >
            {modalContent === "register" ? (
              <RegistrationForm
                onClose={closeModal}
                onRegisterSuccess={handleRegistrationSuccess}
              />
            ) : (
              <LoginForm
                onClose={closeModal}
                onLoginSuccess={handleLoginSuccess}
              />
            )}
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
