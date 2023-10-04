import React, { useState, createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import RoutesComponent from "./Routes";
import NavBar from "./Components/Navbar";
import ErrorBoundary from "./Components/ErrorBoundary";
export const IsLoggedInContext = createContext();

export const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <ErrorBoundary>
      <DndProvider backend={HTML5Backend}>
        <div>
          <IsLoggedInContext.Provider
            value={{
              isLoggedIn: isLoggedIn,
              setLoggedIn: () => {
                setLoggedIn(() => !isLoggedIn);
              },
            }}
          >
            <NavBar />
            <RoutesComponent />
          </IsLoggedInContext.Provider>
        </div>
      </DndProvider>
    </ErrorBoundary>
  );
};

export default App;
