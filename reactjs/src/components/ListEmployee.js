import React, { useState, useEffect } from 'react'
import Employee from './Employee'

import './css/search.css'
import SelectSearch from 'react-select-search';
import Entete from './Entete';



export default function ListEmployee() {
    const [employee, setEmployee] = useState([])
    const [selectZone, setSelectZone] = useState("")
    const [options, setOptions] = useState([])
    const [searchValue, setSearchValue] = useState();

    //au lancement du composant le state employee va être chatgé par tous les employés
    useEffect(() => {
        fetch(`https://team.momji.fr/api/v2/static/employees`)
            .then(res => res.json())
            .then(resultat => {
                setEmployee(resultat);
            })
            .catch(error => console.error(error));

    }, [])

    //remplir le tableau des options de la barre de recherche ** firstName,lasname,email,dateaddress,status**
    useEffect(() => {
        if (selectZone) {
            fetch(`https://team.momji.fr/api/v2/static/employees`)
                .then((response) => { return response.json() })
                .then((response) => {
                    setOptions(response.map((result) => {
                        switch (selectZone) {
                            case 'profile.firstName': return { name: result.profile.firstName, value: result.profile.firstName }; break;
                            case 'profile.lastName': return { name: result.profile.lastName, value: result.profile.lastName }; break;
                            case 'address': return { name: result.address, value: result.address }; break;
                            case 'email': return { name: result.email, value: result.email }; break;
                            case 'registered': return { name: result.registered, value: result.registered }; break;
                            case 'isActive': return { name: [true, false], value: [true, false] }; break;
                        }

                    }))

                })
        }
    }, [selectZone])
    //remplir la zone de recherche par les données néecessaires selon le filtre choisi
    useEffect(() => {
        if (searchValue) {
            fetch(`https://team.momji.fr/api/v2/static/employees`)
                .then((response) => { return response.json(); })
                .then((response) => {
                    let res = response.filter((data) => {
                        switch (selectZone) {
                            case 'profile.firstName': return data.profile.firstName == searchValue; break;
                            case 'profile.lastName': return data.profile.lastName == searchValue; break;
                            case 'address': return data.address == searchValue; break;
                            case 'email': return data.email == searchValue; break;
                            case 'registered': return data.registered == searchValue; break;
                            case 'isActive': return data.isActive == searchValue; break;
                        }
                    })
                    setEmployee(res)
                })
        }
    }, [searchValue]);

    const Search = (value) => {
        setSearchValue(value);
    }
    const handleChange = (event) => {
        setSelectZone(event.target.value);
    }
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <form>
                        <label class="my-1 mr-2" for="inlineFormCustomSelectPref">
                            Select a filter, please
                        </label>
                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" value={selectZone} onChange={handleChange}>
                            <option selected>Filters </option>
                            <option value="profile.firstName">First Name</option>
                            <option value="profile.lastName">Last Name</option>
                            <option value="address">Address</option>
                            <option value="email">Email</option>
                            <option value="registered">Date</option>
                            <option value="isActive">Status</option>

                        </select>
                    </form>
                </div>
                <div className="col-12">
                    <SelectSearch options={options} value={searchValue} placeholder="----------------" onChange={Search} />
                </div>
                <div classNmae="row">
                    <div className="col">
                        <table class="table table-striped">
                            <Entete />
                            {//si le state n'est pas vide, je le parcours et j'appelle le composant 
                                //employee en envoyant avec une props pour afficher la liste dans un table         
                                employee ?
                                    (
                                        employee.map((item, index) => {
                                            return (
                                                <tbody>
                                                    <tr key={index}>
                                                        <Employee employee={item} />
                                                    </tr>
                                                </tbody>
                                            );
                                        })
                                    ) :
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
