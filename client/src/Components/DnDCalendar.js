import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDrop } from "react-dnd";
import { BsFillTrash3Fill } from "react-icons/bs";

const daysOfTheWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DayDropArea = ({ day, addRecipeToDay, recipeByDay, deleteFromDay }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "String",
    drop: (item) => addRecipeToDay(item.id, day),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dayArray = Array.isArray(recipeByDay[day])
    ? recipeByDay[day].sort(function (a, b) {
        return a.sortNum - b.sortNum;
      })
    : null;

  const handleRemove = (recipeId, day) => {
    deleteFromDay(recipeId, day);
  };

  return (
    <div ref={drop} className="day-of-the-week-drag-area">
      {recipeByDay[day] && dayArray !== null
        ? dayArray.map((recipe) => {
            return (
              <div key={recipe.recipeId}>
                <p className="no-p-styles">
                  {recipe.recipeName}
                  <br />
                  <span className="meal-type">{recipe.type}</span>
                  <br />
                  <BsFillTrash3Fill
                    size={10}
                    className="trash-can"
                    onClick={() => handleRemove(recipe.recipeId, day)}
                  />
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
};

const DnDCalendar = ({ savedRecipes, setSavedToast }) => {
  const [recipeByDay, setRecipeByDay] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  useEffect(() => {
    const fetchExistingRecipes = async () => {
      try {
        const token = window.localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:3005/api/users/addRecipesToCalendar/${token}`
        );
        setRecipeByDay(data && data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExistingRecipes();
  }, []);

  window.localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));

  const deleteFromDay = (id, day) => {
    let nonDeletedRecipes =
      recipeByDay[day] &&
      recipeByDay[day].filter((recipe) => id !== recipe.recipeId);
    setRecipeByDay((prevRecipes) => ({
      ...prevRecipes,
      [day]: [...nonDeletedRecipes],
    }));
  };

  const addRecipeToDay = (id, day) => {
    let recipesArray = JSON.parse(localStorage.getItem("savedRecipes"));
    let recipe =
      recipesArray.length &&
      recipesArray.filter((recipe) => id === recipe.recipeId);
    setRecipeByDay((prevRecipes) => ({
      ...prevRecipes,
      [day]: [...(prevRecipes[day] ? prevRecipes[day] : []), recipe[0]],
    }));
  };

  const checkCalendar = () => {
    let length;
    for (let key in recipeByDay) {
      if (recipeByDay[key]) {
        if (recipeByDay[key].length) {
          length = true;
        }
      }
    }
    return length;
  };

  const handleClick = async () => {
    try {
      setSavedToast(true);
      const token = window.localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3005/api/users/addRecipesToCalendar/${token}`,
        recipeByDay
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:3005/api/users//deleteUserCalendar/${token}`
      );

      if (response.status) {
        setRecipeByDay({
          Monday: [],
          Tuesday: [],
          Wednesday: [],
          Thursday: [],
          Friday: [],
          Saturday: [],
          Sunday: [],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="purple-background">
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {" "}
        {checkCalendar() ? (
          <Button
            className="clear-button"
            variant="danger"
            onClick={handleClear}
          >
            Clear
          </Button>
        ) : (
          <Button className="clear-button" variant="danger" disabled>
            Clear
          </Button>
        )}
      </div>
      <h1 className="weekly-meal-calendar-text">My weekly meal calendar</h1>
      <h6 className="sorted-msg">
        Your meals are sorted by meal type (e.g Breakfast, Lunch, Dinner)
      </h6>
      <br />
      <br />
      <div className="day-of-the-week-container">
        {daysOfTheWeek.map((day, idx) => (
          <div>
            <h4 key={idx} style={{ textAlign: "center" }}>
              {day}
            </h4>
            <DayDropArea
              recipeByDay={recipeByDay}
              day={day}
              addRecipeToDay={addRecipeToDay}
              deleteFromDay={deleteFromDay}
            />
          </div>
        ))}
      </div>
      <br />{" "}
      {checkCalendar() ? (
        <Button
          onClick={handleClick}
          variant="success"
          className="centered-button"
        >
          Save
        </Button>
      ) : (
        <Button variant="success" disabled className="centered-button">
          Save
        </Button>
      )}
    </div>
  );
};

export default DnDCalendar;
