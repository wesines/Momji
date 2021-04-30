
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { confirmAlert } from 'react-confirm-alert'; // Import
import './css/react-confirm-alert.css'; // Import css
import DateTimePicker from 'react-datetime-picker'

export default function EditEmployee(props) {

    const [employee, setEmployee] = useState([])
    const [selectValue, setSelectValue] = useState()
    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [sDate, setSDate] = useState();
    const [lastName, setLastName] = useState();
    const [firstName, setFirstName] = useState();
    const [validTarget, setValidTarget] = useState(true);

    const id = props.match.params.id;
    //charger les states par les détails de l'employer à  modifier
    useEffect(() => {

        fetch(`https://team.momji.fr/api/v2/static/employees`)

            .then(res => res.json())
            .then(resultat => {
                let res = resultat.filter((employee) => {
                    if (employee.id == id) {
                        setEmployee(employee)
                        setSelectValue(employee.isActive)
                        setEmail(employee.email)
                        setSDate(employee.registered)
                        setAddress(employee.address)
                        setFirstName(employee.profile.firstName)
                        setLastName(employee.profile.lastName)
                    }
                })
                setEmployee(res)

            })
            .catch(error => console.error(error));

    }, [])


    // fonctions de recupération des champs du formulaires

    const handleChangeSelect = (event) => {
        setSelectValue(event.target.value);
    }
    const handleChangeEmail = (event) => {
        if (/^[^@]+@[^@]+\.[^@]+$/igm.test(email)) {
            setValidTarget(true)
            setEmail(event.target.value)
        } else {
            setEmail(event.target.value)
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
        console.log("Datepicker clicked")
        setSDate(event.target.value)
    }
    //afficher le json de modification dans la console et dans un message Alert
    const onSubmit = (e) => {
        e.preventDefault();
        let intervenant = []
        intervenant.push({
            "id": id,
            "profile": {
                "firstName": firstName,
                "lastName": lastName,
            },
            "email": email,
            "address": address,
            "registered": setSDate,
            "isActive": selectValue,

        })
        let msg = (JSON.stringify(intervenant));
        console.log("les détails de l'intervenant sont \n", intervenant)
        confirmAlert({
            title: 'Confirm to submit',
            message: `details of employnment are${msg}`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => alert('you are clicked YES')
                },
                {
                    label: 'No',
                    onClick: () => alert('you are clicked NO')
                }
            ]
        });


    }


    return (
        <>
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
                            <DateTimePicker value={moment(sDate).format('MM/DD/YYYY HH:mm:ss')} onChange={handleChangeDate} disabled />
                        </div>
                        <div className="form-group col-md-4">
                            <label for="inputState">Status</label>
                            <select name="isActive" className="form-control" defaultValue={selectValue} onChange={handleChangeSelect}>
                                <option selected>Choose...</option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                        <button type="submit" className="form-control btn btn-primary" >Edit Employee</button>

                    </div>

                </form>
            </div >


        </>



    )
}
