import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SimilarRecipes = (props) => {
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const { recipeId, setRecipeId } = props;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `http://localhost:3005/api/recipes/similarRecipes/${recipeId}`
        );
        setSimilarRecipes(data);
      } catch (error) {
        console.error("Something happen try again later", error);
      }
    }
    fetchData();
  }, [recipeId]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (recipe) => {
    let recipeId = recipe.id;
    setRecipeId(recipeId)
    setShow(false);
  };

  return (
    <>
      <Button className="remove-background" onClick={handleShow}>
        Get Similar Recipes
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Try these similar recipes</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {similarRecipes.map((recipe) => {
            return (
              <div className="similar-recipe-flexbox" key={recipe.id}>
                <p onClick={() => handleClick(recipe)}>{recipe.title}</p>
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SimilarRecipes;
