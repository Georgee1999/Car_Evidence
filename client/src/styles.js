export const buttonStyle = {
  backgroundColor: "#A9A9A9",
  border: "none",
  color: "black",
  padding: "10px 50px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "10px 20px", 
  cursor: "pointer",
  borderRadius: "10px",
};

export const inputStyle = {
  padding: "10px",
  margin: "0 0 10px 0",
  borderRadius: "5px",
  border: "1px solid #ddd",
  backgroundColor: "#222",
  color: "white",
};

export const formButtonStyle = {
  backgroundColor: "#0066ff",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "10px 0",
};

export const registrationPopup = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#333", // Tmavé pozadí
    color: "#fff", // Bílý text
    borderRadius: "10px", // Zaoblené rohy
    padding: "20px", // Vnější odsazení
    border: "1px solid #555", // Hraniční link
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)", // Tmavý overlay
  },
};

export const mainContainerStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh", // Použijeme pevnou výšku pro viewport
  justifyContent: "space-between", // Rozloží obsah mezi začátek a konec kontejneru
  alignItems: "center",
  margin: 0,
  padding: 0
}

export const bodyStyle = {
  flex: 1, // Allows the body to expand and fill available space
  display: 'flex',
  flexDirection: 'column', // Aligns children elements in a column
  justifyContent: 'center', // Center content vertically in the middle of the page
  alignItems: 'center', // Center content horizontally
  padding: '20px', // Provides padding inside the body
  overflow: 'hidden' // Prevents any content from overflowing
};

export const footerStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: "8px 0",
  textAlign: "center",
  backgroundColor: "#696969",
  color: "white",
  width: "100%"
}


