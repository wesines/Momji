import React, { useState, useEffect } from 'react'
import SelectSearch from 'react-select-search';
import Employee from './Employee'
import './search.css'

export default function EmployeeFilter() {
    const [employee, setEmployee] = useState([])
    const [selectZone, setSelectZone] = useState(0)
    const [options, setOptions] = useState([])
    const [searchValue, setSearchValue] = useState();



    //remplir le tableau des options de la barre de recherche
    useEffect(() => {
        if (selectZone) {
            fetch(`https://team.momji.fr/api/v2/static/employees`)
                .then((response) => { return response.json() })
                .then((response) => {
                    setEmployee(response);
                    setOptions(response.map((result) => {
                        switch (selectZone) {
                            case 'profile.firstName': return { name: result.profile.firstName, value: result.profile.firstName }; break;
                            case 'profile.lastName': return { name: result.profile.lastName, value: result.profile.lastName }; break;
                            case 'address': return { name: result.address, value: result.address }; break;
                            case 'email': return { name: result.email, value: result.email }; break;
                            case 'registered': return { name: result.registered, value: result.registered }; break;
                            case 'isActive': return { name: result.isActive, value: result.isActive }; break;
                        }

                    }))

                })
        }
    }, [selectZone])

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
                            Choose your filter, please
                        </label>
                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" value={searchValue} onChange={handleChange}>
                            <option selected>Choose...</option>
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
                    <SelectSearch options={options} value={searchValue} placeholder="Choose your filter please" onChange={Search} />
                </div>
                <div classNmae="row">
                    <div className="col">
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
                </div>


            </div>
        </div>
    )
}
