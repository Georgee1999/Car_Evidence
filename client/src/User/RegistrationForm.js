import React, { useState } from "react";

import { formButtonStyle, inputStyle, registrationForm } from "../styles";
import { createUser } from "../api";

function RegistrationForm({ onClose, onRegisterSuccess }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(""); // Stav pro zprávu
  const [showMessage, setShowMessage] = useState(false);





  const handleSubmit = async (event) => {
    event.preventDefault();

    if (address.length < 4) {
      setMessage("Adresa musí mít minimálně 4 znaky.");
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
      return;
    }

    const userData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
    };

    try {
     const user =  await createUser(userData); // Voláme API
      setMessage("Registrace byla úspěšná!"); // Nastavíme zprávu
      setShowMessage(true); // Zobrazíme zprávu
      setTimeout(() => {
        setShowMessage(false); // Skryjeme zprávu po 2 sekundách
        onRegisterSuccess(`${firstName} ${lastName}`, user.id); // budeme předávat i user.id do Layoutu do handlesuccess
        onClose(); // Zavřeme modal
      }, 2000);
    } catch (error) {
      setMessage("Registrace selhala: " + error.message); // Zobrazíme chybovou zprávu
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={ registrationForm }
    >
        <input
          style={inputStyle}
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          placeholder="Jméno"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          placeholder="Příjmení"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          style={inputStyle}
          placeholder="Adresa Bydliště"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      <button style={formButtonStyle} type="submit">
        Registrovat se
      </button>
      <button style={formButtonStyle} onClick={onClose}>
        Zrušit
      </button>
      {showMessage && (
        <div style={{ color: "green", textAlign: "center" }}>{message}</div>
      )}
    </form>
  );
}
export default RegistrationForm;
