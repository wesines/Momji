import React, { useState, useEffect } from 'react'
import SelectSearch from 'react-select-search';

export default function EmployeeFilter() {
    const [employee, setEmployee] = useState([])
    const [selectZone, setSelectZone] = useState(0)
    const [options, setOptions] = useState([])


    //remplir le tableau des options de la barre de recherche
    useEffect(() => {
        fetch(`https://team.momji.fr/api/v2/static/employees`)
            .then((response) => { return response.json() })
            .then((response) => {
                //response.results
                setEmployee(response);
                setOptions(response.map((result) => {
                    return { name: result.selectZone, value: result.selectZone }
                }))
            })
    }, [employee])


    const Search = (event) => {
        setSelectZone(event.target.value);
    }
    const handleChange = (event) => {
        setSelectZone(event.target.value);
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <form>
                        <label class="my-1 mr-2" for="inlineFormCustomSelectPref">
                            Choose your filter, please
                        </label>
                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" value={selectZone} onChange={handleChange}>
                            <option selected>Choose...</option>
                            <option value="profile.firstName">First Name</option>
                            <option value="profile.lastName">Last Name</option>
                            <option value="address">Address</option>
                            <option value="email">Email</option>
                            <option value="registered">Date</option>
                            <option value="isActive">Status</option>

                        </select>
                        <button type="submit" class="btn btn-primary my-1">Submit</button>
                    </form>
                </div>

                {/*<SelectSearch options={options} value={selectZone} placeholder="Choose your pokemon" onChange={Search} />*/}


            </div>
        </div>
    )
}
