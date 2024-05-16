import React, { useState } from "react";
import { formButtonStyle, inputStyle, registrationForm } from "../../styles/styles";
import { createCar } from "../../api/api";

function AddCarForm({ onClose, onAddCarSuccess }) {
  const [SPZ, setSpz] = useState("");
  const [model, setModel] = useState("");
  const [yearOfMade, setYearOfMade] = useState("");
  const [color, setColor] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState(""); // Stav pro zprávu


  const handleSubmit = async (event) => {
    event.preventDefault();

    const carData = {
      SPZ: SPZ,
      model: model,
      yearOfMade: yearOfMade,
      color: color,
      email: email,
    };

    try {
      const newCar = await createCar(carData);
      setMessage("Auto bylo úspěšně zaregistrováno.");
      setTimeout(() => {
        setMessage('');
        onAddCarSuccess(newCar);
        onClose();
      }, 3000);
    } catch (error) {
      setMessage( error.message);
      setTimeout(() => {
        setMessage('');
      }, 3000);
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
          setMessage("");
        }}
        placeholder="SPZ"
        required
      />
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
      {message && <div style={{ color: message.includes('úspěšně') ? 'green' : 'red' }}>{message}</div>}
    </form>
  );
}

export default AddCarForm;