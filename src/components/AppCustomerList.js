import React, { useContext } from "react";
import { stateContext } from "../App";

import { EditCustomer } from "./AppDetails";

const AppCustomerList = () => {
  const stateContextValue = useContext(stateContext);

  const customerList = stateContextValue.state;

  ////// edit functionality //////

  function editFunction(id) {
    stateContextValue.setStateToggle(false);
    stateContextValue.setStateId(id);
  }

  return (
    <div className="wrapper">
      <h1>Today's Purchase</h1>

      <div className="customer-list">
        <table>
          <thead>
            <tr>
              <th colSpan="4">
                <h2>Customers List</h2>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>Name</th>
              <th># of items</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>

            {customerList.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.Name}</td>
                  <td>{item.NumberOfItems}</td>
                  <td> ₹ {item.Amount}</td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() =>
                        stateContextValue.dispatch({
                          type: "Edit",
                          id: item.id,
                          editFunction: () => editFunction(item.id),
                        })
                      }
                    >
                      Edit
                    </button>
                    <span> | </span>
                    <button
                      className="btn-delete"
                      onClick={() => {
                        if (
                          window.confirm("Do you want to delete this customer?")
                        ) {
                          stateContextValue.dispatch({
                            type: "Delete",
                            id: item.id,
                          });
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppCustomerList;
