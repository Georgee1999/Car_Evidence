import React from 'react';
import { carCardStyle, carCardHoverStyle } from "../../styles/styles";

const CarCard = ({ car, index, hoveredIndex, setHoveredIndex }) => {
  return (
    <div
      key={index}
      style={{
        ...carCardStyle,
        ...(hoveredIndex === index ? carCardHoverStyle : {}),
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(-1)}
    >
      <p>
        <strong>SPZ:</strong> {car.SPZ}
      </p>
      <p>
        <strong>Model:</strong> {car.model}
      </p>
      <p>
        <strong>Rok výroby:</strong> {car.yearOfMade}
      </p>
      <p>
        <strong>Barva:</strong> {car.color}
      </p>
      <p>
        <strong>Email:</strong> {car.email}
      </p>
    </div>
  );
};

export default CarCard;
