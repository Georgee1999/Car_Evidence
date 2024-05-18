import React, { useState } from "react";

import { formButtonStyle, inputStyle, registrationForm } from "../../styles/styles";
import { createUser } from "../../api/api";

function RegistrationForm({ onClose, onRegisterSuccess }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(""); // Stav pro zprávu





  const handleSubmit = async (event) => {
    event.preventDefault();


    const userData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address,
    };

    try {
      const user = await createUser(userData); // Voláme API
      setMessage("Registrace byla úspěšná!"); // Nastavíme zprávu
      setTimeout(() => {
        setMessage(''); // Skryjeme zprávu po 2 sekundách
        onRegisterSuccess(user); // budeme předávat i user.id do Layoutu do handlesuccess
        onClose(); // Zavřeme modal
      }, 2000);
    } catch (error) {
      setMessage(error.message); // Zobrazíme chybovou zprávu
      setTimeout(() => {
        setMessage('');
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
      {message && <div style={{ color: message.includes('úspěšná') ? 'green' : 'red' }}>{message}</div>}
    </form>
  );
}
export default RegistrationForm;