import React from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/Register";
import AuthRoute from "./AuthRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route
          path="/Dashboard"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
