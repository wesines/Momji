
import React, { useState, useEffect } from 'react'
import ListEmployee from './components/ListEmployee'
import EmployeeFilter from './components/EmployeeFilter'

function App() {
const [employee, setEmployee] = useState([])




return (
  <div className="container">
    <EmployeeFilter employee={employee} />
    <ListEmployee employee={employee} />


  </div>
);
};


export default App;
