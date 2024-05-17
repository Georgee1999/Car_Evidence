import React from "react";
import { buttonStyle, buttonHoverStyle, buttonContainerStyle } from "../styles/styles";

const ActionButtons = ({ openModal, openDeleteModal, handleAllCarsClick, openEmailModal , hoveredButton, setHoveredButton }) => {
  return (
    <div style={buttonContainerStyle}>
      <button
        style={{
          ...buttonStyle,
          ...(hoveredButton === "delete" ? buttonHoverStyle : {}),
        }}
        onMouseEnter={() => setHoveredButton("delete")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={openDeleteModal}
      >
        Smazat auto
      </button>
      <button
        onClick={openModal}
        style={{
          ...buttonStyle,
          ...(hoveredButton === "add" ? buttonHoverStyle : {}),
        }}
        onMouseEnter={() => setHoveredButton("add")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        Nové auto
      </button>
      <button
        onClick={handleAllCarsClick}
        style={{
          ...buttonStyle,
          ...(hoveredButton === "myCars" ? buttonHoverStyle : {}),
        }}
        onMouseEnter={() => setHoveredButton("myCars")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        Registrovaná auta
      </button>
      <button
        onClick={openEmailModal}
        style={{
          ...buttonStyle,
          ...(hoveredButton === "carsByEmail" ? buttonHoverStyle : {}),
        }}
        onMouseEnter={() => setHoveredButton("carsByEmail")}
        onMouseLeave={() => setHoveredButton(null)}
      >
        Vyhledat auta
      </button>
    </div>
  );
};

export default ActionButtons;
