import React, { useState } from "react";
import { formButtonStyle, inputStyle, registrationForm } from "../styles";
import { createCar } from "../api";

function AddCarForm({ onClose, onAddCarSuccess }) {
  const [SPZ, setSpz] = useState("");
  const [model, setModel] = useState("");
  const [yearOfMade, setYearOfMade] = useState("");
  const [color, setColor] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState(""); // Stav pro zprávu
  const [showMessage, setShowMessage] = useState(false);

  const [spzError, setSpzError] = useState(""); // Stav pro chybovou zprávu SPZ

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (SPZ.length < 6) {
      setSpzError("SPZ musí mít alespoň 6 znaků");
      return;
    }

    const carData = {
      SPZ: SPZ,
      model: model,
      yearOfMade: yearOfMade,
      color: color,
      email: email,
    };

    try {
      const newCar = await createCar(carData);
      setMessage("Auto bylo úspěšně zaregistrováno."); // Nastavíme zprávu
      setShowMessage(true); // Zobrazíme zprávu
      setTimeout(() => {
        setShowMessage(false); // Skryjeme zprávu po 3 sekundách
        onAddCarSuccess(newCar);
        onClose(); // Zavřeme modal
      }, 3000);
    } catch (error) {
      setMessage("Registrace selhala: " + error.message); // Zobrazíme chybovou zprávu
      setShowMessage(true);
      console.log(error)
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={ registrationForm }>
      <input
        type="text"
        style={inputStyle}
        value={SPZ}
        onChange={(e) => {
          setSpz(e.target.value);
          setSpzError("");
        }}
        placeholder="SPZ"
        required
      />
      {spzError && (
        <div style={{ color: "red", textAlign: "center" }}>{spzError}</div>
      )}
      <input
        type="text"
        style={inputStyle}
        value={model}
        onChange={(e) => setModel(e.target.value)}
        placeholder="Model"
        required
      />
      <input
        type="number"
        style={inputStyle}
        value={yearOfMade}
        onChange={(e) => setYearOfMade(e.target.value)}
        placeholder="Rok výroby"
        required
      />
      <input
        type="text"
        style={inputStyle}
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Barva"
        required
      />
      <input
        type="email"
        style={inputStyle}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email majitele"
        required
      />
      <button style={formButtonStyle} type="submit">
        Přidat auto
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

export default AddCarForm;
