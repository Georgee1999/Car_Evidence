import React, { useState } from "react";
import {
  formButtonStyle,
  inputStyle,
  registrationForm,
} from "../../styles/styles";

const FindCarsByEmailForm = ({ onClose, onEmailSubmit }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       await onEmailSubmit(email);
      setMessage('Auta nalezena');
        setMessage('');
        onClose();
    } catch (error) {
      setMessage(error.message);
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={registrationForm}>
      <input
        type="email"
        placeholder="Zadejte e-mailovou adresu"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
        required
      />
      <button type="submit" style={formButtonStyle}>
        Vyhledat auta
      </button>
      <button type="button" onClick={onClose} style={formButtonStyle}>
        Zrušit
      </button>
      {message && <div style={{ color: message.includes('nalezena') ? 'green' : 'red' }}>{message}</div>}
    </form>
  );
};

export default FindCarsByEmailForm;