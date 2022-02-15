import React, { useState, useEffect, useContext } from "react";
import { stateContext } from "../App";
import { v4 } from "uuid";

const AppDetails = (props) => {
  const stateContextValue = useContext(stateContext);

  let stateToggleContextValue = stateContextValue.stateToggle;
  let myStateId = stateContextValue.stateId;

  let onEditStateValue = stateContextValue.state.filter(
    (item) => item.id === myStateId
  );
  console.log(onEditStateValue);

  const [newCustomer, setNewCustomer] = useState({});

  const [name, setName] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [amount, setAmount] = useState("");

  let parsedItmQty = parseInt(itemQty);
  let parsedAmount = parseInt(amount);

  useEffect(
    () =>
      setNewCustomer({
        id: v4(),
        Name: name,
        NumberOfItems: parsedItmQty,
        Amount: parsedAmount,
      }),
    [name, itemQty, amount]
  );

  function nameHandler(e) {
    setName(e);
  }

  function itmQtyHandler(e) {
    setItemQty(e);
  }

  function amountHandler(e) {
    setAmount(e);
  }

  //////// Reducer action /////////

  const addCustomer = {
    type: "AddCustomer",
    payload: newCustomer,
  };

  ////// submit form /////

  function submitForm(e) {
    e.preventDefault();
    setName("");
    setItemQty("");
    setAmount("");
  }

  return (
    <div className="wrapper">
      {/* <h1>AppDetails</h1> */}

      <div className="cust-detail">
        {stateToggleContextValue ? (
          <h2>Add Customer</h2>
        ) : (
          <h2 className="edit-customer">Edit Customer</h2>
        )}

        <form onSubmit={submitForm} className="add-cust">
          <label htmlFor="fname">Full Name :</label>
          <input
            type="text"
            id="fname"
            placeholder="Enter your name..."
            // value={stateToggleContextValue ? name : onEditStateValue[0].Name}
            value={name}
            onChange={(e) => nameHandler(e.target.value)}
          />
          <br />
          <label htmlFor="itmpurch">Items purchased :</label>
          <input
            type="number"
            id="itmpurch"
            placeholder="Enter number of items..."
            // value={
            //   stateToggleContextValue
            //     ? itemQty
            //     : onEditStateValue[0].NumberOfItems
            // }
            value={itemQty}
            onChange={(e) => itmQtyHandler(e.target.value)}
          />
          <br />
          <label htmlFor="itmamount">Amount :</label>
          <input
            type="number"
            id="itmamount"
            placeholder="Enter amout..."
            // value={
            //   stateToggleContextValue ? amount : onEditStateValue[0].Amount
            // }
            value={amount}
            onChange={(e) => amountHandler(e.target.value)}
          />

          {stateToggleContextValue ? (
            <button
              type="submit"
              className="btn-add-cust"
              onClick={(e) => stateContextValue.dispatch(addCustomer)}
            >
              Add Customer
            </button>
          ) : (
            <button
              // type="button"
              className="btn-add-cust"
              onClick={(e) =>
                stateContextValue.dispatch({
                  type: "EditCustomer",
                  payload: newCustomer,
                  id: myStateId,
                  setId: stateContextValue.setStateToggle(true),
                })
              }
            >
              Edit Customer
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AppDetails;
