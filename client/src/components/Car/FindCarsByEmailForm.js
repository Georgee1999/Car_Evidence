import React, { useState } from "react";
import { formButtonStyle, inputStyle, registrationForm } from "../../styles/styles";

const EmailForm = ({ onClose, onEmailSubmit }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setMessage("Prosím zadejte e-mailovou adresu.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      return;
    }
    onEmailSubmit(email);
    setEmail("");
    onClose();
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
      {message && <div style={{ color: "red" }}>{message}</div>}
    </form>
  );
};

export default EmailForm;
