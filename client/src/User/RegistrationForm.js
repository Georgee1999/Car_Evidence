import React, { useState } from "react";

import { formButtonStyle, inputStyle } from "../styles";
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

    const userData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
    };

    try {
      await createUser(userData); // Voláme API
      setMessage("Registrace byla úspěšná!"); // Nastavíme zprávu
      setShowMessage(true); // Zobrazíme zprávu
      setTimeout(() => {
        setShowMessage(false); // Skryjeme zprávu po 2 sekundách
        onRegisterSuccess(`${firstName} ${lastName}`);
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
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <label>
        Email :
        <input
          style={inputStyle}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Jméno :
        <input
          style={inputStyle}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Příjmení :
        <input
          style={inputStyle}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        Adresa :
        <input
          style={inputStyle}
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
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
