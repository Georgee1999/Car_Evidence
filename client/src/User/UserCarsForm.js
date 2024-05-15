import React, { useState } from 'react';
import { formButtonStyle, inputStyle } from "../styles";
import { getUserCars } from '../api';


function UserCarsForm({ onClose, onFetchUserCars }) {

  const [id, setId] = useState('');
  const [message, setMessage] = useState(""); // Stav pro zprávu
  const [showMessage, setShowMessage] = useState(false);


  const handleSubmit = async (event) => {

    event.preventDefault();




    try{
      const cars = await getUserCars(id);
      onFetchUserCars(cars);
      // setMessage("Data úspěšně načtena"); // Nastavíme zprávu
      // setShowMessage(true); // Zobrazíme zprávu
      // setTimeout(() => {
      //   setShowMessage(false); // Skryjeme zprávu po 3 sekundách
        onClose(); // Zavřeme modal
    //  }, 3000);
    }catch(error){
      setMessage("Načtení dat selhalo " + error.message); // Zobrazíme chybovou zprávu
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
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="id uživatele"
        required
      />
      <button style={formButtonStyle} type="submit">Vyhledat</button>
      <button style={formButtonStyle} onClick={onClose}>Zrušit</button>
      {showMessage && <p>{message}</p>}
    </form>
  );
}

export default UserCarsForm;
