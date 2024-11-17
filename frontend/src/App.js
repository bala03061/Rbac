import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Crud from "./pages/Crud";
import AddEmployee from "./pages/AddEmployee";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/crud" element={<Crud />} />
                <Route path="/add-employee" element={<AddEmployee />} />
            </Routes>
        </Router>
    );
};

export default App;
