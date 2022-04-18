import React from 'react'
import Registration from './Registration'
import Login from './Login'
import NewPage from './NewPage'
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Registration />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/new" element={<NewPage />} />
        
      </Routes>
      
    </Router>
  )
}

export default App