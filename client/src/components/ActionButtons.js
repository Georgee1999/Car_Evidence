import React from "react";
import {
  buttonContainerStyle,
  buttonStyle,
  buttonHoverStyle,
} from "../styles/styles";

const ActionButtons = ({
  openModal,
  openDeleteModal,
  handleAllCarsClick,
  openEmailModal,
  hoveredButton,
  setHoveredButton,
}) => {
  return (
    <div style={buttonContainerStyle}>
      <button
        style={hoveredButton === "new" ? buttonHoverStyle : buttonStyle}
        onMouseEnter={() => setHoveredButton("new")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={openModal}
      >
        Nové auto
      </button>
      <button
        style={hoveredButton === "delete" ? buttonHoverStyle : buttonStyle}
        onMouseEnter={() => setHoveredButton("delete")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={openDeleteModal}
      >
        Smazat auto
      </button>
      <button
        style={hoveredButton === "all" ? buttonHoverStyle : buttonStyle}
        onMouseEnter={() => setHoveredButton("all")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={handleAllCarsClick}
      >
        Registrovaná auta
      </button>
      <button
        style={hoveredButton === "email" ? buttonHoverStyle : buttonStyle}
        onMouseEnter={() => setHoveredButton("email")}
        onMouseLeave={() => setHoveredButton(null)}
        onClick={openEmailModal}
      >
        Vyhledat auta
      </button>
    </div>
  );
};

export default ActionButtons;
