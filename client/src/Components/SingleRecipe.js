import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import SimilarRecipes from "./SimilarRecipes";
import AuthModal from "./AuthModal";
import { IsLoggedInContext } from "../App";
// import axios from "axios";
import instance from "../Axios/AxiosInstance"
import moment from "moment";

const SingleRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [recipeObject, setRecipeObject] = useState({});
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const [message, setMessage] = useState("");

  const { isLoggedIn } = useContext(IsLoggedInContext);

  let curLocationUrl = location.pathname;

  useEffect(() => {
    let id
    if (location.state === null) {
      navigate("/");
      return;
    }
    if (recipeId) {
      id = recipeId
    } else {
      id = location.state.query.recipeId || window.localStorage.getItem("RecipeId");
      setRecipeId(id)
    }

    async function fetchSingleRecipe() {
      try {
        const { data } = await instance.get(`/recipes/${id}`);
        setRecipeObject(data);
        setLoading(false);
        window.localStorage.removeItem("recipeId");
      } catch (error) {
        navigate("/");
        console.log(error);
      }
    }
    fetchSingleRecipe();
  }, [navigate, recipeId]);

  let {
    title,
    summary,
    image,
    extendedIngredients,
    instructions,
    readyInMinutes,
    servings,
    spoonacularSourceUrl,
  } = recipeObject;

  const originalString = summary || "";
  summary = originalString.replace(/(<([^>]+)>)/gi, " ");

  const duration = moment.duration(readyInMinutes, "minutes");
  readyInMinutes = `${Math.floor(
    duration.asHours()
  )} hours ${duration.minutes()} minutes`;

  instructions = instructions || " ";
  instructions = removeHtmlTags(instructions);

  const handleSave = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const { data } = await instance.post(
        `/users/userRecipes/${token}`,
        recipeObject
      );
      if (data === "Already saved") setMessage(data);
      else setSaved(true);
    } catch (error) {
      console.log(error);
    }
  };

  // if (window.localStorage.getItem("RecipeId"))
  //   window.localStorage.removeItem("RecipeId");

  return (
    <div>
      {loading ? (
        <div className="div-holding-spinner">
          <h1 className="fetching-recipes">
            {recipeObject.title === null
              ? "Redirecting to homepage..."
              : " Fetching your recipe..."}
          </h1>

          <Spinner
            className="fetching-recipes"
            animation="border"
            variant="success"
          />
        </div>
      ) : (
        <div className="single-receta">
          <div className="flex-single-recipe-title">
            <h1 className="single-recipe-title">{title}</h1>
            <p className="cook-time-serving">Ready in: {readyInMinutes} mins</p>
            <p className="cook-time-serving">Servings: {servings}</p>
          </div>
          <div className="image-ingredient-flex">
            <img className="single-recipe-image" src={image} alt="recipe" />
            <div>
              <br />
              <h1 className="align-center">Ingredients</h1>
              {extendedIngredients
                ? extendedIngredients.map((ingredient) => {
                  return (
                    <p key={ingredient.id} className="ingredients">
                      {` ${ingredient.measures.us.amount} ${ingredient.measures.us.unitShort} of ${ingredient.name}`}
                    </p>
                  );
                })
                : null}
              <div>
                <br />
                <h1 className="align-center">Instructions</h1>
                <p className="instructions">{instructions}</p>
              </div>
            </div>
          </div>
          <br />
          <h3 className="additional-information align-center">Additional Information</h3>
          <p className="summary">{summary}</p>
          <br />
          <br />
          <div className="center-suggestions">
            <p className="no-p-styles2">{message && message}</p>
            {!isLoggedIn ? (
              <AuthModal url={curLocationUrl} recipeId={recipeId} />
            ) : (
              <Button
                variant="primary"
                onClick={handleSave}
                className="bold-text"
              >
                {saved ? "Saved!" : "Save"}
              </Button>
            )}
          </div>
          <br />
          <div className="centered-url bold-text">
            <a href={spoonacularSourceUrl}>Get more information</a>
            <br />
            <SimilarRecipes recipeId={recipeObject.id} setRecipeId={setRecipeId} />
          </div>
          <br />
        </div>
      )}
    </div>
  );
};

const removeHtmlTags = (str) => {
  const regex = /(<([^>]+)>)/gi;
  const plainstr = str.replace(regex, "");
  return plainstr;
};

export default SingleRecipe;
