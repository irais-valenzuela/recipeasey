import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Results from "./Components/Results";
import SingleRecipe from "./Components/SingleRecipe";
import Auth from "./Components/Auth";
import UserDashboard from "./Components/UserDashboard";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route path="/results" element={<Results />} />
      <Route path="/singleRecipe" element={<SingleRecipe />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
    </Routes>
  );
};

export default RoutesComponent;