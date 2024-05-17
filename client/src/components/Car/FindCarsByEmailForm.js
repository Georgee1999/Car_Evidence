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
      const cars = await onEmailSubmit(email);
      console.log("Cars fetched in handleSubmit:", cars);

      if (!cars) {
        console.error("Cars is undefined");
        throw new Error("Received undefined response from onEmailSubmit");
      }

      if (!Array.isArray(cars)) {
        console.error("Cars is not an array:", cars);
        throw new Error("Unexpected response format, expected an array");
      }

      console.log("Cars length:", cars.length);

      if (cars.length === 0) {
        setMessage("Auta nenalezena.");
      } else {
        setMessage("");
        onClose();
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setMessage(error.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      // Modal zůstane otevřený, aby zobrazil chybovou zprávu
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
      {message && (
        <div style={{ color: message.includes("nalezena") ? "green" : "red" }}>
          {message}
        </div>
      )}
    </form>
  );
};

export default FindCarsByEmailForm;
