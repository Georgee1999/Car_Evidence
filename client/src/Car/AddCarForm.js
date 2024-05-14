import React, { useState } from 'react';
import { formButtonStyle, inputStyle } from "../styles";
import { createCar } from '../api';


function AddCarForm({ onClose }) {
  const [SPZ, setSpz] = useState('');
  const [model, setModel] = useState('');
  const [yearOfMade, setYearOfMade] = useState('');
  const [color, setColor] = useState('');
  const [email, setEmail] = useState('');

  const [message, setMessage] = useState(""); // Stav pro zprávu
  const [showMessage, setShowMessage] = useState(false);


  const handleSubmit = async (event) => {

    event.preventDefault();

    const carData = {
      SPZ: SPZ,
      model: model,
      yearOfMade: yearOfMade,
      color: color,
      email: email
    };


    try{
      await createCar(carData);
      setMessage("Auto bylo úspěšně zaregistrováno."); // Nastavíme zprávu
      setShowMessage(true); // Zobrazíme zprávu
      setTimeout(() => {
        setShowMessage(false); // Skryjeme zprávu po 3 sekundách
        onClose(); // Zavřeme modal
      }, 3000);
    }catch(error){
      setMessage("Registrace selhala: " + error.message); // Zobrazíme chybovou zprávu
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      },2000);
    }
  
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        style={inputStyle}
        value={SPZ}
        onChange={(e) => setSpz(e.target.value)}
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
      <button style={formButtonStyle} type="submit">Přidat auto</button>
      <button style={formButtonStyle} onClick={onClose}>Zrušit</button>
      {showMessage && (
        <div style={{ color: "green", textAlign: "center" }}>{message}</div>
      )}
    </form>
  );
}

export default AddCarForm;
