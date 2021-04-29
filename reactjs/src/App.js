
import React, { useState, useEffect } from 'react'
import ListEmployee from './components/ListEmployee'
import EmployeeFilter from './components/EmployeeFilter'
import './App.css';
function App() {
  const [employee, setEmployee] = useState([])




  return (
    <div className="container">
      <div className="filter-part"    >
        <h3 style={{ color: 'blue' }}>Filter Part</h3>
        <EmployeeFilter employee={employee} />
      </div>
      <div className="list-employee">
        <h3 style={{ color: 'blue' }}>Employee List</h3>
        <ListEmployee employee={employee} />

      </div>


    </div >
  );
};


export default App;
