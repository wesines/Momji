
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Alert } from 'bootstrap';
//import { DateTime } from 'react-datetime-bootstrap';

export default function EditEmployee(props) {

    const [employee, setEmployee] = useState([])
    const [selectValue, setSelectValue] = useState()
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [sDate, setStDate] = useState();
    const [lastName, setLastName] = useState();
    const [firstName, setFirstName] = useState();
    const [validTarget, setValidTarget] = useState(true);

    const id = props.match.params.id;
    //charger les states par les détails de l'employer à  modifier
    useEffect(() => {
        console.log("id", id)
        fetch(`https://team.momji.fr/api/v2/static/employees`)

            .then(res => res.json())
            .then(resultat => {
                let res = resultat.filter((employee) => {
                    if (employee.id == id) {
                        console.log("hello")
                        setEmployee(employee)
                        setSelectValue(employee.isActive)
                        setEmail(employee.email)
                        //  setSDate(employee.registered)
                        setAddress(employee.address)
                        setFirstName(employee.profile.firstName)
                        setLastName(employee.profile.lastName)
                    }
                })
                setEmployee(res)
                console.log("employee a modifier", employee)
            })
            .catch(error => console.error(error));

    }, [])


    // fonctions de recupération des champs du formulaires

    const handleChangeSelect = (event) => {
        setSelectValue(event.target.value);
    }
    const handleChangeEmail = (event) => {
        if (/^[^@]+@[^@]+\.[^@]+$/igm.test(email)) {
            setEmail(event.target.value)
        } else {
            setValidTarget(false)
        }
    }
    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value)
    }
    const handleChangeLastName = (event) => {
        setLastName(event.target.value)
    }
    const handleChangeAddress = (event) => {
        setAddress(event.target.value)
    }
    const handleChangeDate = (event) => {
        //  setSDate(event.target.value)
    }
    //afficher le json de modification dans la console
    const onSubmit = (e) => {
        e.preventDefault();
        let intervenant = []
        intervenant.push({
            "id": "",
            "profile": {
                "firstName": firstName,
                "lastName": lastName,
            },
            "email": email,
            "address": address,
            "registered": setStDate,
            "isActive": selectValue,

        })
        console.log("intervenant", intervenant)
    };


    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputEmail4">FirstName</label>
                        <input type="text" className="form-control" value={firstName}
                            name="profile.firstName" placeholder="FirstName" onChange={handleChangeFirstName} />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="inputPassword4">LastName</label>
                        <input type="text" className="form-control" value={lastName}
                            name="profile.lastName" placeholder="lastName" onChange={handleChangeLastName} />
                    </div>
                </div>
                <div className="form-group">
                    <label for="inputAddress">Address</label>
                    <input type="text" className="form-control" name="address" value={address}
                        placeholder="Address" onChange={handleChangeAddress} />
                </div>
                <div className="form-group">
                    <label for="inputAddress2">Email</label>
                    <input type="email" className={!validTarget ? "form-control is-invalid" : "form-control"}
                        value={email} placeholder="Email" onChange={handleChangeEmail} />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="inputCity">Date</label>

                        {/*   <DateTime pickerOptions={{ format: "LL" }} value={setSDate} onChange={handleChangeDate} />*/}
                    </div>
                    <div className="form-group col-md-4">
                        <label for="inputState">Status</label>
                        <select name="isActive" className="form-control" onChange={handleChangeSelect}>
                            <option selected>Choose...</option>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    <button type="submit" className="form-control btn btn-primary" >Edit Employee</button>

                </div>



            </form>


        </div >






    )
}
