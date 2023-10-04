import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CuisineForm from "./CuisineForm";
import MealType from "./MealTypeForm";
import MealPrepTimeForm from "./MealPrepTimeForm";

let questionCount = 0;

function InitialQueryModal() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [firstQuestion, setFirstQuestion] = useState(true);
  const [secondQuestion, setSecondQuestion] = useState(true);
  const [cuisineType, setCuisineType] = useState("");
  const [mealType, setMealType] = useState("");
  const [mealTime, setMealTime] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNext = () => {
    if (questionCount === 0) {
      setFirstQuestion(false);
      questionCount += 1;
    } else if (questionCount === 1) {
      setSecondQuestion(false);
      questionCount += 1;
    } else if (questionCount === 2) {
      navigate("/results", {
        state: { query: { cuisineType, mealType, mealTime } },
      });
    }
  };

  const handleBack = () => {
    questionCount -= 1;
    if (questionCount === 0) {
      setFirstQuestion(true);
    } else if (questionCount === 1) {
      setSecondQuestion(true);
    }
  };

  useEffect(() => {
    return () => {
      questionCount = 0;
    };
  }, []);

  return (
    <>
      <Button
        className="get-started-button bold-text"
        variant="success"
        onClick={handleShow}
      >
        Get Started
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="bold-text">
            Tell us more about your meal plans
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bold-text-for-modal center-question">
          {firstQuestion ? (
            <h5>1. Pick your cuisine</h5>
          ) : secondQuestion ? (
            <h5>2. Pick breakfast, lunch, dinner</h5>
          ) : (
            <h5>3. Pick how much time you'd like to spend on cooking</h5>
          )}
        </Modal.Body>
        {firstQuestion ? (
          <CuisineForm setCuisineType={setCuisineType} />
        ) : secondQuestion ? (
          <MealType setMealType={setMealType} />
        ) : (
          <MealPrepTimeForm setMealTime={setMealTime} />
        )}

        <Modal.Footer>
          {questionCount === 0 ? null : (
            <Button variant="none" onClick={handleBack} className="bold-text">
              Back
            </Button>
          )}

          <Button variant="primary" onClick={handleNext} className="bold-text">
            Next
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InitialQueryModal;