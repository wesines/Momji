import React, { useState, useEffect } from 'react'
import Employee from './Employee'


export default function ListEmployee() {
    const [employee, setEmployee] = useState([])
    //au lancement du composant le state employee va être chatgé par l'api
    useEffect(() => {
        fetch(`https://team.momji.fr/api/v2/static/employees`)
            .then(res => res.json())
            .then(resultat => {
                setEmployee(resultat);
                console.log("state", employee)
                console.log("resultat", resultat.length)

            })
            .catch(error => console.error(error));

    }, [])

    return (
        <>
            {        console.log("body", employee)}

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
                    {//si le state n'est pas vide, je le parcours et j'appelle le composant 
                        //employee en envoyant avec une props pour afficher la liste dans un table         
                        employee ?
                            (
                                employee.map((item) => {
                                    return (
                                        <tbody>
                                            <tr>
                                                <Employee employee={item} />
                                            </tr>
                                        </tbody>
                                    );
                                })
                            ) :
                            "Loading...."}


                </table>
            </div>


        </>
    )
}

