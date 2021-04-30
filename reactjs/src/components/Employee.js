import React from 'react'
import moment from 'moment'
import { Link } from "react-router-dom";
export default function Employee({ employee }) {

    return (//je recupere la props employee et j'affiche les details des apprenants
        <>
            <td scope="row">
                <Link to={`/editEmployee/${employee.id}`}>modifier</Link>
            </td>
            <td scope="row">

                {employee.profile.firstName}

            </td>
            <td scope="row">
                {employee.profile.lastName}
            </td>
            <td scope="row">
                {employee.address}
            </td>
            <td scope="row">
                {moment(employee.registered).format('YYYY-MM-DD HH:mm:ss')}
            </td>
            <td scope="row">
                {employee.email}
            </td>
            <td scope="row">
                {(employee.isActive) ? "true" : "false"}

            </td>
        </>

    )
}
