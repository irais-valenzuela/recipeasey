import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import InitialQueryModal from "./InitialQueryModal";
import { IsLoggedInContext } from "../App";

function NavBar() {
  const loggedInContext = useContext(IsLoggedInContext);
  const { isLoggedIn, setLoggedIn } = loggedInContext;

  const location = useLocation();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("RecipeId");
    window.localStorage.removeItem("savedRecipes");
    window.localStorage.removeItem("formType");
    setLoggedIn(false);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link className="no-underlining" to="/">
          <Navbar.Brand className="website-name-on-navbar bold-text">
            Recipeasey🍓
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-links">
            <Link className="no-underlining home-link" to="/">
              Home
            </Link>
            {location.pathname === "/" && (
              <a className="no-underlining home-link" href="#howItWorks">
                How it works
              </a>
            )}
            <Link
              className="no-underlining home-link"
              onClick={isLoggedIn && handleLogout}
              to={isLoggedIn ? "/" : "/auth"}
            >
              {isLoggedIn ? "Log out" : "Log in"}
            </Link>
            {isLoggedIn && (
              <Link className="no-underlining home-link" to="/userdashboard">
                My dashboard
              </Link>
            )}
            <InitialQueryModal variant="success">Get Started</InitialQueryModal>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
