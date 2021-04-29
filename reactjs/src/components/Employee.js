import React, { useState, useEffect } from 'react'
import moment from 'moment'
export default function Employee({ employee }) {

    return (//je recupere la props employee et j'affiche les details des apprenants
        <>
            <th scope="row">
                {employee.profile.firstName}
            </th>
            <th scope="row">
                {employee.profile.lastName}
            </th>
            <th scope="row">
                {employee.address}
            </th>
            <th scope="row">
                {moment(employee.registered).format('MMMM Do YYYY')}
            </th>
            <th scope="row">
                {employee.email}
            </th>
            <th scope="row">
                {employee.isActive}
            </th>
        </>

    )
}
