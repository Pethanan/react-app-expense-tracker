import React, { useContext, useRef } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { expensesActions } from "../../store/expensesSlice";
import { authActions } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./NewExpenseForm.css";
import { useState } from "react";
import Modal from "../UI/Modal";

const NewExpenseForm = () => {
  const [showModal, setShowModal] = useState(false);
  const darkmode = useSelector((state) => state.auth.premiumMode);

  const dispatch = useDispatch();
  const userMail = useSelector((state) => state.auth.userMail);
  const userDBEndpoint = userMail.replace("@", "").replaceAll(".", "");

  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const itemTitleRef = useRef(null);
  const itemAmountRef = useRef(null);
  const itemCategoryRef = useRef(null);
  const itemDateRef = useRef(null);

  const URL = `https://expensetracker-33a48-default-rtdb.firebaseio.com/${userDBEndpoint}/expenses.json`;

  const addExpenseHandler = async (e) => {
    e.preventDefault();
    const enteredItemTitle = itemTitleRef.current.value;
    const enteredItemAmount = itemAmountRef.current.value;
    const enteredItemCategory = itemCategoryRef.current.value;
    const enteredItemDate = itemDateRef.current.value;

    itemTitleRef.current.value = "";
    itemAmountRef.current.value = "";
    itemCategoryRef.current.value = "";
    itemDateRef.current.value = "";

    const expenseItem = {
      title: enteredItemTitle,
      amount: enteredItemAmount,
      category: enteredItemCategory,
      date: enteredItemDate,
    };
    console.log(enteredItemDate);
    console.log(enteredItemDate);
    console.log(enteredItemDate);
    console.log(enteredItemDate);

    const addExpenseResponse = await axios.post(`${URL}`, expenseItem);
    console.log(addExpenseResponse.data);
    const addedItem = {
      ...expenseItem,
      name: addExpenseResponse.data.name,
      amount: +enteredItemAmount,
    };
    console.log(addedItem);
    console.log(addedItem);
    console.log(addedItem);
    console.log(addedItem);

    dispatch(expensesActions.addExpense(addedItem));
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 1000);
  };

  const signUpModalCloseHandler = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`${darkmode ? "darkmode" : ""}`}
      style={{ marginTop: "3rem" }}
    >
      <div className="new-expense">
        <button
          className="add-expense-enable-btn"
          onClick={(e) => {
            setShowExpenseForm((prev) => !prev);
          }}
        >
          Add New Expense
        </button>

        {showExpenseForm && (
          <Form onSubmit={addExpenseHandler} style={{ width: "40%" }}>
            <div
              className={`${
                darkmode
                  ? "form new-expense__controls"
                  : "new-expense__controls"
              }`}
            >
              <div
                className={`${
                  darkmode
                    ? "form new-expense__control"
                    : "new-expense__control"
                }`}
              >
                <Form.Label style={{ color: "rgb(227, 228, 233)" }}>
                  Item Name
                </Form.Label>
                <Form.Control
                  placeholder="item name"
                  type="text"
                  ref={itemTitleRef}
                />
              </div>

              <div
                className={`${
                  darkmode
                    ? "form new-expense__control"
                    : "new-expense__control"
                }`}
              >
                <Form.Label style={{ color: "rgb(227, 228, 233)" }}>
                  Amount
                </Form.Label>
                <Form.Control
                  placeholder="0"
                  type="number"
                  ref={itemAmountRef}
                />
              </div>

              <div
                className={`${
                  darkmode
                    ? "form new-expense__control"
                    : "new-expense__control"
                }`}
              >
                <Form.Label style={{ color: "rgb(227, 228, 233)" }}>
                  Category
                </Form.Label>
                <Form.Control
                  placeholder="category"
                  type="text"
                  ref={itemCategoryRef}
                />
              </div>

              <div className="new-expense__control">
                <Form.Label style={{ color: "rgb(227, 228, 233)" }}>
                  Date
                </Form.Label>
                <Form.Control type="date" ref={itemDateRef} />
              </div>

              <div className="new-expense__actions">
                <button className="new-expense--btn" type="submit">
                  Submit
                </button>
                <button
                  className="new-expense--btn cancel"
                  type="submit"
                  onClick={() => {
                    setShowExpenseForm(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        )}
      </div>
      {showModal && (
        <Modal
          signUpModalCloseHandler={signUpModalCloseHandler}
          displayContent="Expense Added successFully"
        />
      )}
    </div>
  );
};

export default NewExpenseForm;
