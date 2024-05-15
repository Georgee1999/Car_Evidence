import React, { useState } from "react";
import { formButtonStyle, inputStyle, registrationForm } from "../styles";
import { deleteCarBySpz } from "../api";

function DeleteCarForm({ onClose, onDeleteCarSuccess }) {
  const [SPZ, setSpz] = useState("");
  const [message, setMessage] = useState(""); // Stav pro zprávu
  const [showMessage, setShowMessage] = useState(false);

  const [spzError, setSpzError] = useState(""); // Stav pro chybovou zprávu SPZ

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (SPZ.length < 6) {
      setSpzError("SPZ musí mít alespoň 6 znaků");
      return;
    }

    try {
        const result = await deleteCarBySpz(SPZ);
        setMessage(result.message);
        setShowMessage(true);
        if (result.message.includes("odstraněno")) {
          setTimeout(() => {
            onDeleteCarSuccess(SPZ);
            onClose();
          }, 2000);
        } else if (result.message.includes("neexistuje")) {
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
        }
      } catch (error) {
        setMessage(error.message);
        setShowMessage(true);
        if (error.message.includes("neexistuje")) {
          setTimeout(() => {
            setShowMessage(false);
          }, 3000);
        }
      }
  };

  return (
    <form onSubmit={handleSubmit} style={registrationForm}>
      <input
        type="text"
        style={inputStyle}
        value={SPZ}
        onChange={(e) => setSpz(e.target.value)}
        placeholder="SPZ auta k smazání"
        required
      />
      {spzError && (
        <div style={{ color: "red", textAlign: "center" }}>{spzError}</div>
      )}
      <button style={formButtonStyle} type="submit">
        Smazat
      </button>
      <button style={formButtonStyle} onClick={onClose}>
        Zrušit
      </button>
      {showMessage && (
        <div
          style={{
            color: message.includes("odstraněno") ? "green" : "red",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}
    </form>
  );
}

export default DeleteCarForm;
