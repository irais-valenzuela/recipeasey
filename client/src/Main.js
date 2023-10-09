import React, { useState } from "react";
import AppCarousel from "./Components/AppCarousel";
import { useNavigate } from "react-router-dom";
import WhatIsRecipeasey from "./Components/WhatIsRecipeasey";
import InitialQueryModal from './Components/InitialQueryModal';

const Main = (props) => {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);

  return (
    <>
      <AppCarousel navigate={navigate} setShowResults={setShowResults} />
      <WhatIsRecipeasey />
      <div className="flex-getstarted">
      <InitialQueryModal />
      </div>
    </>
  );
};

export default Main;
