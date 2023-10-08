import React from "react";

const CuisineForm = (props) => {
  let setCuisineType = props.setCuisineType

  const handleChange = (e) => {
    let selected = e.target.value;
    setCuisineType(selected);
  };

  return (
    <form className="flex-for-form">
      <label htmlFor="cuisine"></label>
      <select name="cuisine" id="cuisine" onChange={handleChange}>
        {cuisineOptions.map((option, idx) => {
          return (
            <option value={option} key={idx}>
              {option}
            </option>
          );
        })}
      </select>
    </form>
  );
};

const cuisineOptions = [
  "select", 
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

export default CuisineForm;
