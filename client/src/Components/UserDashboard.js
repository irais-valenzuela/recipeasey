import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserRecipes from "./UserRecipes";
import { IsLoggedInContext } from "../App";
import DndCalendar from "./DnDCalendar";
import { BsFillTrash3Fill } from "react-icons/bs";
import { useDrop } from "react-dnd";
import SavedToast from "./SavedToast";


const UserDashboard = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [userName, setUserName] = useState("");
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        const token = window.localStorage.getItem("token");
        const { data } = await axios.get(`http://localhost:3005/api/users/${token}`);
        setUserName(data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = window.localStorage.getItem("token");
        const { data } = await axios.get(`http://localhost:3005/api/users/userRecipes/${token}`);
        setSavedRecipes(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleViewDelete = async (recipeId) => {
    try {
      const token = window.localStorage.getItem("token");
      const { data } = await axios.delete(
        `http://localhost:3005/api/users/deleteRecipe/${token}/${recipeId}`
      );
      setSavedRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "String",
    drop: (item) => handleViewDelete(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const { isLoggedIn } = useContext(IsLoggedInContext);

  return (
    <>
      {isLoggedIn ? (
        <div className="margin-for-dash">
          <h1 className="username-margin">Welcome {userName}</h1>
          <h6 className="drag-instructions username-margin">
            Drag and drop your recipes onto your calendar.
          </h6>

          <br />
          <h4
            className='saved-recipes-msg'
          >
            My saved meals
          </h4>
    
          <UserRecipes
            savedRecipes={savedRecipes}
            setSavedRecipes={setSavedRecipes}
          />
          <div
            ref={drop}
            className={
              isOver
                ? "background-feedback-color-trash centered-trash-can"
                : "centered-trash-can"
            }
          >
            <BsFillTrash3Fill size={30} className="trash-can" />
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {savedToast && <SavedToast />}
          </div>
          <DndCalendar
            savedRecipes={savedRecipes}
            setSavedToast={setSavedToast}
          />
        </div>
      ) : (
        <h3 className="centered-text-userdash">
          Please log in to see your dashboard
        </h3>
      )}
    </>
  );
};

export default UserDashboard;
