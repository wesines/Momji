
/*Développer une mini application en ReactJS en suivants ces spécifications :
1/ récupérer une liste d’intervenants depuis le endpoint API :
https://team.momji.fr/api/v2/static/employees
2/ afficher la liste des intervenants sous la forme d’une liste avec possibilité de filtrer (par
nom, statut ...)
3/ au clic sur un intervenant, ouvrir un formulaire d’édition permettant de modifier les
données liées à cet intervenant
4/ au moment de soumettre le formulaire, afficher le json destiné à mettre à jour l’API
En développant cette application, tu dois garder en tête qu'elle est susceptible
d'évoluer (nouveaux champs, nouveaux filtres de recherche ...)
Des tests unitaires seront les bienvenus (Jest ...) .
Pense à commenter ton code et à commiter de manière atomique.
Le test technique sera publié sur une plateforme de versionning au choix (Github ou
Gitlab).

NB: le développement de la partie API n’est pas demandé*/


import React, { useState, useEffect } from 'react'
import ListEmployee from './components/ListEmployee'
function App() {
  const [profile, setProfile] = useState("")
  const [adress, setAdress] = useState("")
  const [registered, setRegistered] = useState("")
  const [isActive, setIsActive] = useState("")
  const [employee, setEmployee] = useState("")

  useEffect(() => {
    fetch("https://team.momji.fr/api/v2/static/employees")
      .then(res => res.json())
      .then(resultat => {
        setEmployee(resultat);
        console.log("state", employee)
      })
      .catch(error => console.error(error));

  }, [])

  return (
    <div className="App" >

      {employee.map((item, index) => {
        <div className="container">
          <span key={index}> <ListEmployee employee={item} /></span>
        </div>
      })}

    </div >
  );
}

export default App;
