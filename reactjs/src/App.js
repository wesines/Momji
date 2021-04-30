
import React, { useState, useEffect } from 'react'
import ListEmployee from './components/ListEmployee'

import './App.css';
function App() {
  const [employee, setEmployee] = useState([])




  return (
    <div className="container">

      <div className="list-employee">
        <h3 style={{ color: 'blue' }}>Employee List</h3>
        <ListEmployee employee={employee} />

      </div>


    </div >
  );
};


export default App;
