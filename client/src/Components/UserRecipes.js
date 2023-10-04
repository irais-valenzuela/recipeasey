import React from "react";
import { useDrag } from "react-dnd";

const DraggableRecipe = ({ recipe }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "String",
    item: { id: recipe.recipeId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <p ref={drag} className="users-recipes-size userdashboard-recipes ">
        {recipe.recipeName}
        <br />
        <span className="meal-type">{`(${recipe.type})`}</span>
      </p>
    </>
  );
};

const UserRecipes = ({ savedRecipes }) => {
  return (
    <div className="user-dashboard-recipes draggableElementsContainer">
      {Array.isArray(savedRecipes) && savedRecipes.length ? (
        savedRecipes.map((recipe) => (
          <DraggableRecipe
            className="bold-text"
            key={recipe.id}
            recipe={recipe}
          />
        ))
      ) : (
        <h1>No saved recipes :(</h1>
      )}
    </div>
  );
};

export default UserRecipes;
