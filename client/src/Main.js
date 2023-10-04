import React, { useState } from "react";
import AppCarousel from "./Components/AppCarousel";
import { useNavigate } from "react-router-dom";
import WhatIsRecipeasey from "./Components/WhatIsRecipeasey";

const Main = (props) => {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  return (
    <>
      <AppCarousel navigate={navigate} setShowResults={setShowResults} />
      <WhatIsRecipeasey />
    </>
  );
};

export default Main;
