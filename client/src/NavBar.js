
import Navbar from "react-bootstrap/Navbar";

import Container from "react-bootstrap/Container";

import Icon from "@mdi/react";
import { mdiCar } from "@mdi/js";
import Button from "react-bootstrap/esm/Button";

function NavBar({ isLoggedIn, onLogout, userName }) {

  return (
    <Navbar expand="lg" style={componentStyle()}>
      <Container style={{display:'flex', justifyContent:'space-between', width:'100%'}}>
        <Button onClick={onLogout} style={buttonStyle()}>
          <Icon path={mdiCar} size={1} color={"white"} />
          <span style={textStyle()}>Evidence Aut</span>
        </Button>
        { isLoggedIn &&(
          <>
          <span style={{ color: "white", marginRight: "20px" }}>Vítej {userName}</span>
          <button onClick={onLogout}  style={logoutButtonStyle()}>
            Odhlásit se
          </button>
          </>
        )}
      </Container>
    </Navbar>
  );
}

function textStyle() {
  return {
    marginLeft: "10px",
    color: "white",
    fontSize: "16px",
  };
}

function buttonStyle() {
  return {
    backgroundColor: "#343a40", // A dark gray color
    borderRadius: "10px",
    border: "none", // Removes default border
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 15px", // Adjust padding to ensure elements are well spaced
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.25)", // Adds shadow for depth
    cursor: "pointer",
  };
}

function componentStyle() {
  return {
    backgroundColor: "#696969", //backround of navbar
    padding: "10px 0",
    marginBottom: "4px",
  };
}

function logoutButtonStyle() {
  return {
    backgroundColor: "#dc3545", // Tlačítko pro odhlášení může mít varovný červený styl
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };
}
export default NavBar;
