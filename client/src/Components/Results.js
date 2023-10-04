import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
// import axios from "axios";
import instance from "../Axios/AxiosInstance"

const Result = () => {
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(true);
  const [mealParams, setMealParams] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state === null) {
      navigate("/");
      return;
    }
    setMealParams(location.state.query);
    const { cuisineType, mealTime, mealType } = location.state.query;

    async function fetchData() {
      try {
        const { data } = await instance.post("/recipes", {
          cuisineType,
          mealTime,
          mealType,
        });
        console.log('data', data)
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSingleRecipeClick = (id) => {
    let recipeId = id;
    navigate("/singleRecipe", {
      state: { query: { recipeId } },
    });
  };
  return (
    <div>
      {loading ? (
        <div className="div-holding-spinner">
          <h1 className="fetching-recipes ">
            {location.state === null
              ? "Redirecting to homepage"
              : "Recipe ideas coming right up!"}
          </h1>

          <Spinner
            className="fetching-recipes "
            animation="border"
            variant="success"
          />
        </div>
      ) : results.length ? (
        <div className="center-results-box">
          <h1 className="margin-for-results">
            Results for{" "}
            {`${mealParams.cuisineType}, ${mealParams.mealType}, ${mealParams.mealTime}: `}
          </h1>

          <div className="results-parent-div">
            {results.map((recipe) => {
              return (
                <div
                  key={recipe.id}
                  className="results-flex"
                  onClick={() => handleSingleRecipeClick(recipe.id)}
                >
                  <h1 className="font-for-results">{recipe.title}</h1>
                  <br />
                  <img
                    className="circular-edge"
                    src={recipe.image}
                    alt="recipe"
                  />
                </div>
              );
            })}
          </div>
          <h6 className='result-length'>{results.length} results</h6>
          <br />
          <div className="center-button bold-text">
            <Button onClick={handleClick} variant="primary">
              Back
            </Button>
          </div>
          <br />
        </div>
      ) : (
        <div className="error-results ">
          <h1>{`Could not find recipes for ${mealParams.cuisineType} cuisine within the ${mealParams.mealType} and ${mealParams.mealTime} categories :(. `}</h1>
        </div>
      )}
   
    </div>
  );
};

export default Result;
