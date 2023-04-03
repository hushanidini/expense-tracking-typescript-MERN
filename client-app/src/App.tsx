import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashbaord from './componets/Dashbaord/Dashbaord';
import Expenses from './componets/Expenses';
import AddExpense from './componets/AddExpense';
import EditExpense from './componets/EditExpense';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
      
        <a href="/" className="navbar-brand">
          $
        </a>
        <div className="navbar-nav mr-auto">
        <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/expenses"} className="nav-link">
              Expenses
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add 
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
      <Routes>
          <Route path="/" element={<Dashbaord/>} />
          <Route path="/expenses" element={<Expenses/>} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/expenses/:id" element={<EditExpense/>} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
