
const express = require("express");
const { employee } = require("../config/db.config.js");
const router = express.Router();
const db = require('../config/db.config.js');


//add Team
module.exports.createTeam = async (req, res, next) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    try {
        db.team.create({
            name: req.body.name,
            description: req.body.description,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at

        })
            .then(team => {
                // Send created customer to client
                console.log("team created", team)
                res.json(team);
            })
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }

}
//get All Team
module.exports.getAllTeam = async (req, res, next) => {
    try {
        db.team.findAll({
            attributes: { exclude: ["updated_at", "updated_at"] }
        })
            .then(teams => {
                res.json(teams);
            })
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }
}

// getTeamByID
module.exports.getTeamByID = async (req, res, next) => {
    try {
        db.team.findById(req.params.id,
            { attributes: { exclude: ["updated_at", "updated_at"] } }
        )
            .then(team => {
                if (!team) {
                    return res.status(404).json({ message: "Team Not Found" })
                }
                return res.status(200).json("team created", team)
            }
            )
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }
}

//  editTeam
module.exports.editTeam = async (req, res, next) => {
    try {
        db.team.findByPk(req.params.id,
            { attributes: { exclude: ["updated_at", "updated_at"] } }
        )
            .then(
                team => {
                    if (!team) {
                        return res.status(404).json({
                            message: 'Team Not Found',
                        });
                    }
                    return team.update({
                        name: req.body.name,
                        description: req.body.description,
                        created_at: req.body.created_at,
                        updated_at: req.body.updated_at
                    })
                        .then(() => res.status(200).json("team updated", team))
                        .catch((error) => res.status(400).send(error));
                })
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }
}
//  deleteTeam
module.exports.deleteTeam = async (req, res, next) => {
    try {
        return db.team
            .findByPk(req.params.id)
            .then(team => {
                if (!team) {
                    return res.status(400).send({
                        message: 'Team Not Found',
                    });
                }

                return team.destroy()
                    .then(() => res.status(200).json({ message: "Team destroyed successfully!" }))
                    .catch(error => res.status(400).send(error));
            })
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }
}
//deleteAllteams
module.exports.deleteAllTeam = async (req, res, next) => {
    try {
        db.team.destroy({
            where: {},
            truncate: true
        })
            .then(() => res.status(200).json({ message: "All Teams are  destroyed successfully!" }))
            .catch(error => res.status(400).send(error));

    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }
}

//add Employee
module.exports.createEmployee = async (req, res, next) => {
    try {
        db.employee.create({
            profile: req.body.profile,
            email: req.body.email,
            address: req.body.address,
            registered: req.body.registered,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at

        })
            .then(employee => {
                // Send created customer to client
                console.log("employee created", employee)
                res.json(employee);
            })

    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }

}
//  getEmployeeByID
module.exports.getEmployeeByID = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Something went wrong ")
    }
}

//get All Employee
module.exports.getAllEmployee = async (req, res, next) => {
    try {
        db.employee.findAll({
            attributes: { exclude: ["updated_at", "updated_at"] }
        })
            .then(employee => {
                res.json(employee);
            })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Something went wrong ")
    }
}


//  editEmployee
module.exports.editEmployee = async (req, res, next) => {
    try {
        db.employee.findByPk(req.params.id,
            { attributes: { exclude: ["updated_at", "updated_at"] } }
        )
            .then(employee => {
                console.log("employee", employee.profile)
                if (!employee) {
                    return res.status(404).json({ message: "Employee Not Found" })
                }
                return res.status(200).json("Employee updated", employee)
            }
            )
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }
}

//  deleteEmployee
module.exports.deleteEmployee = async (req, res, next) => {
    try {
        return db.employee
            .findByPk(req.params.id)
            .then(team => {
                if (!team) {
                    return res.status(400).send({
                        message: 'Employee Not Found',
                    });
                }

                return team.destroy()
                    .then(() => res.status(200).json({ message: "Employee destroyed successfully!" }))
                    .catch(error => res.status(400).send(error));
            })
    } catch (err) {

        console.log(err);
        res.status(500).send("Something went wrong ")
    }
}

module.exports.deleteAllEmployee = async (req, res, next) => {
    try {
        db.employee.destroy({
            where: {},
            truncate: true
        })
            .then(() => res.status(200).json({ message: "All Employee are destroyed successfully!" }))
            .catch(error => res.status(400).send(error));

    } catch (err) {

        console.log(err);
        res.status(500).send("Something went wrong ")
    }
}