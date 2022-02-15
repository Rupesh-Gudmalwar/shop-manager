import React, { useState, useReducer, createContext } from "react";
import AppCustomerList from "./components/AppCustomerList";
import AppDetails from "./components/AppDetails";
import Data from "./components/Data";
import "./App.css";

export const stateContext = createContext();

const initialState = Data;

const reducer = (state, action) => {
  switch (action.type) {
    case "AddCustomer":
      return [...state, action.payload];

    case "Delete":
      return state.filter((item) => item.id !== action.id);

    case "EditCustomer":
      try {
        return (state = state.map((item) => {
          if (item.id === action.id) {
            return action.payload;
          }
          return item;
        }));
      } catch {
        console.log("error");
      }

    case "Edit":
      action.editFunction();
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [stateToggle, setStateToggle] = useState(true);

  const [stateId, setStateId] = useState(null);

  return (
    <div className="App">
      <stateContext.Provider
        value={{
          state,
          dispatch,
          stateToggle,
          setStateToggle,
          stateId,
          setStateId,
        }}
      >
        <AppCustomerList />
        <AppDetails />
      </stateContext.Provider>
    </div>
  );
}

export default App;
