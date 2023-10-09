import React from "react";

const mealTypes = [
  "select",
  "breakfast",
  "lunch", // "appetizer"
  "dinner", // "main course"
  "snack",
  "side dish",
  "drink",
  "beverage",
];

const MealTypeForm = (props) => {
  let setMealType = props.setMealType;
  
  const handleChange = (e) => {
    let selectedType = e.target.value;
    if (selectedType === "lunch") {
      setMealType("appetizer")
    } else if (selectedType === "dinner") {
      setMealType("main course")
    } else {
      setMealType(selectedType);
    }

    
  };
  return (
    <form className="flex-for-form">
      <label htmlFor="foodTime"></label>
      <select name="foodTime" id="foodTime" onChange={handleChange}>
        {mealTypes.map((mealType, idx) => {
          return <option value={mealType} key={idx}>{mealType}</option>;
        })}
      </select>
    </form>
  );
};

export default MealTypeForm;