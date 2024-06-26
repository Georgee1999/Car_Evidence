export const mainContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
};

export const bodyStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
};
export const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  margin: "20px 0",
  gap: "10px",  // Přidání odstupu mezi tlačítky
};
export const buttonStyle = {
  backgroundColor: "#2C3E50",
  backgroundImage: "linear-gradient(45deg, #2C3E50, #34495E)",
  border: "none",
  color: "white",
  padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer",
  borderRadius: "8px",
  transition: "background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Přidání jemného stínu
};

export const buttonHoverStyle = {
  ...buttonStyle,
  backgroundColor: "#1A252F",
  backgroundImage: "linear-gradient(45deg, #1A252F, #2C3E50)",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  transform: "scale(1.05)",
};


// FORM
export const registrationForm = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  backgroundColor: "#2c2c2c",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  width: "300px",
};
export const formButtonStyle = {
  backgroundColor: "#0066ff",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "10px 0",
  fontWeight: "bold",
  textTransform: "uppercase",
  transition: "background-color 0.3s ease",
};
export const inputStyle = {
  padding: "10px",
  margin: "0 0 10px 0",
  borderRadius: "5px",
  border: "1px solid #ddd",
  backgroundColor: "#222",
  color: "white",
  fontSize: "14px",
  outline: "none",
};
export const registrationPopup = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "10px",
    padding: "20px",
    border: "1px solid #555",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

// CAR CARD
export const carContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};
export const carCardStyle = {
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  backgroundColor: "#fff",
  margin: "10px",
  minWidth: "250px",
  textAlign: "left",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  //cursor: "pointer",
};
export const carCardHoverStyle = {
  transform: "scale(1.05)",
  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
};

// FOOTER
export const footerStyle = {
  textAlign: "center",
  backgroundColor: "#2c3e50",
  color: "white",
  width: "100%",
  padding: "8px 0",
  position: "fixed",
  bottom: 0,
  left: 0,
};