import React, { Component } from 'react'

export default class ListEmployee extends Component {
    render() {
        const { firstName, lastName, address, email, date, status } = this.props
        return (

            <>

                <tbody>
                    <tr>
                        <th scope="row">
                            {firstName}
                        </th>
                        <th scope="row">
                            {lastName}
                        </th>
                        <th scope="row">
                            {address}
                        </th>
                        <th scope="row">
                            {email}
                        </th>
                        <th scope="row">
                            {date}
                        </th>
                        <th scope="row">
                            {status}
                        </th>
                    </tr>
                </tbody>

            </>
        )
    }
}
