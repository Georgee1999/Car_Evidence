import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate, Outlet } from "react-router-dom";
import RegistrationForm from "./components/User/RegistrationForm";
import LoginForm from "./components/User/LoginForm";
import NavBar from "./components/NavBar";
import { useUser } from "./context/UserContext";

import {
  registrationPopup,
  mainContainerStyle,
  buttonStyle,
  bodyStyle,
  footerStyle,
} from "./styles/styles";

const Layout = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  //const [userName, setUserName] = useState(""); // Nový stav pro jméno uživatele
  // const [userId, setUserId] = useState(""); // Nový stav pro ID uživatele
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  Modal.setAppElement("#root");

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRegistrationSuccess = (name, id) => {
    //   setIsLoggedIn(true);
    //  setUserName(name); // Nastavení jména uživatele po úspěšné registraci
    //  setUserId(id); // Nastavení ID uživatele po úspěšné registraci
    setUser({ name, id });
    navigate("/dashboard"); // Přesměrování na Dashboard po úspěšné registraci
    closeModal();
  };
  const handleLoginSuccess = (user) => {
    console.log("Login successful, user:", user);
    //setIsLoggedIn(true);
    setUser(user);
    //setUserName(`${user.firstName} ${user.lastName}`);
    //setUserId(user.id);
    console.log("Setting userId to:", user.id);
    navigate("/dashboard");
    closeModal();
  };

  const onLogout = () => {
    //setIsLoggedIn(false);  // Nastaví isLoggedIn na false
    //setUserName(""); // Vyprázdnění jména uživatele po odhlášení
    //setUserId("");
    setUser(null);
    navigate("/"); // Přesměrování na úvodní stránku
  };

  return (
    <>
      <NavBar
        isLoggedIn={!!user}
        onLogout={onLogout}
        firstName={user?.firstName || ""}
        lastName={user?.lastName || ""}
      />
      <div style={mainContainerStyle}>
        <div style={bodyStyle}>
          {!user ? (
            <>
              <button onClick={() => openModal("login")} style={buttonStyle}>
                Přihlásit se
              </button>
              <button onClick={() => openModal("register")} style={buttonStyle}>
                Registrovat
              </button>
            </>
          ) : (
            <div>
              <Outlet />
            </div>
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
