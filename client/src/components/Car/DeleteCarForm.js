import React, { useState } from "react";
import { formButtonStyle, inputStyle, registrationForm } from "../../styles/styles";
import { deleteCarBySpz } from "../../api/api";

function DeleteCarForm({ onClose, onDeleteCarSuccess }) {
  const [SPZ, setSpz] = useState("");
  const [message, setMessage] = useState(""); // Stav pro zprávu


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (SPZ.length < 6) {
      setMessage("SPZ musí mít alespoň 6 znaků");
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }

    try {
       await deleteCarBySpz(SPZ);
      setMessage("Vozidlo bylo úspěšně odstraněno.");
      setTimeout(() => {
        setMessage('');
        onDeleteCarSuccess(SPZ);
        onClose();
      }, 2000);
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
        type="text"
        style={inputStyle}
        value={SPZ}
        onChange={(e) => {
          setSpz(e.target.value);
          setMessage("");
        }}
        placeholder="SPZ auta ke smazání"
        required
      />
      <button style={formButtonStyle} type="submit">
        Smazat
      </button>
      <button style={formButtonStyle} onClick={onClose}>
        Zrušit
      </button>
      {message && <div style={{ color: message.includes('úspěšně') ? 'green' : 'red' }}>{message}</div>}
    </form>
  );
}

export default DeleteCarForm;