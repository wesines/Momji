
import React, { useState, useEffect } from 'react'
import ListEmployee from './components/ListEmployee'
function App() {
  // const [profile, setProfile] = useState("")
  // const [adress, setAdress] = useState("")
  // const [registered, setRegistered] = useState("")
  // const [isActive, setIsActive] = useState("")
  const [employee, setEmployee] = useState([])
  const [page, setPage] = useState(0)
  const [numberOfPage, setNumberOfPage] = useState(0)

  useEffect(() => {
    fetch(`https://team.momji.fr/api/v2/static/employees?limit=20&offset=${page}`)
      .then(res => res.json())
      .then(resultat => {
        setEmployee(resultat);
        setNumberOfPage(Math.floor(resultat.count / 20));
        console.log("state", employee)
      })
      .catch(error => console.error(error));

  }, [page])




  const previousPage = () => {
    if (page >= 20) {
      setPage(page - 20);
    }
  };
  const nextPage = () => {
    setPage(page + 20);
  };
  const paginationItem = () => {
    const pages = [];
    for (let i = 0; i < numberOfPage; i++) {
      pages.push(
        <li class="page-item">
          <button class="page-link" onClick={() => setPage(i * 20)}>
            {i + 1}
          </button>
        </li>
      );
    }

    return pages;
  }
  return (
  <div className="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">
            FirstName
                        </th>
          <th scope="col">
            LastName
                        </th>
          <th scope="col">
            Adress
                        </th>
          <th scope="col">
            Date
                        </th>
          <th scope="col">
            email
                        </th>
          <th scope="col">
            Status
                        </th>
        </tr>
      </thead>

      {employee.map((item) => {
        return (

          <ListEmployee
            firstName={item.profile.firstName}
            lastName={item.profile.lastName}
            address={item.address}
            email={item.email}
            date={item.registered}
            status={item.isActive}


          />

        );
      })}
    </table>
    <div className="ListButtons">
      <div className="ListButtonsContainer">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button
                class="page-link"
                aria-label="Previous"
                onClick={previousPage}
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            {paginationItem()}
            <li class="page-item">
              <button
                class="page-link"
                aria-label="Next"
                onClick={nextPage}
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div >
  );
};


export default App;
