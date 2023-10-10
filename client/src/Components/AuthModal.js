import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const AuthModal = (props) => {
  const { url, recipeId } = props;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  

  const handleClose = () => {
    setShow(false);
    window.localStorage.setItem("Single Recipe Link", url);
    window.localStorage.setItem("RecipeId", recipeId);
    navigate("/auth",);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="bold-text" variant="primary" onClick={handleShow}>
        Save
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="bold-text">Log in or Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bold-text">
          Help us remember what you'd like to save to your user dashboard.
          Please log in or sign up
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Log in/Sign up
          </Button>
    
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AuthModal;
