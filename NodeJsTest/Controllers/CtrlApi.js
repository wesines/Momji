
const express = require("express");

const db = require('../config/db.config.js');


//add Team
module.exports.createTeam = (req, res, next) => {
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
        console.log(err.message);
        res.status(500).send("Something went wrong ")
    }
}

// getTeamByID
module.exports.getTeamByID = (req, res, next) => {
    db.team.findByPk(req.params.id)
        .then((team) => {
            if (!team) {
                return res.status(404).json({ message: 'Team Not Found' });
            }

            return res.status(200).json(team);
        })
        .catch((error) => {
            return res.status(400).json(error.message)
        });
}

//  editTeam
module.exports.editTeam = (req, res, next) => {
    try {
        db.team.findByPk(req.params.id)
            .then(
                team => {
                    if (!team) {
                        return res.status(404).json({ message: 'Team Not Found' });
                    }
                    team.update({
                        name: req.body.name,
                        description: req.body.description,
                    })
                        .then(() => { return res.status(200).json(team) })
                        .then(() => { res.json("team updated", team); console.log("update is done") })
                        .catch((error) => res.status(400).send(error));
                })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Something went wrong ")
    }
}
//  deleteTeam
module.exports.deleteTeam = (req, res, next) => {
    try {
        db.team.findByPk(req.params.id)
            .then(team => {
                if (!team) {
                    return res.status(400).send({ message: 'Team Not Found', });
                }
                team.destroy()
                    .then(() => res.status(200).json({ message: "Team destroyed successfully!" }))
                    .catch(error => res.status(400).send(error));
            })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Something went wrong ")
    }
}
//deleteAllteams
module.exports.deleteAllTeam = (req, res, next) => {
    try {

        db.team.destroy({ truncate: true, cascade: false })
            .then(() => res.status(200).json({ message: "All Teams are  destroyed successfully!" }))
            .catch(error => res.status(400).send(error));

    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }
}

//add Employee
module.exports.createEmployee = (req, res, next) => {
    try {
        db.employee.create({
            profile: req.body.profile,
            email: req.body.email,
            address: req.body.address,
            registered: req.body.registered,
            isActive: req.body.isActive,
            idTeam: req.body.idTeam,

        }, { onDelete: 'CASCADE' })
            .then(employee => {
                console.log("employee created", employee)
                res.json(employee);
            })

    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }

}
//  getEmployeeByID
module.exports.getEmployeeByID = (req, res, next) => {
    try {
        db.employee.findByPk(req.params.id)
            .then((employee) => {
                if (!employee) {
                    return res.status(404).json({ message: 'Employee Not Found' });
                }

                return res.status(200).json(employee);
            })
            .catch((error) => {
                return res.status(400).json(error.message)
            });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Something went wrong ")
    }
}

//get All Employee
module.exports.getAllEmployee = async (req, res, next) => {
    try {
        db.employee.findAll({
            include: [{
                model: db.team,
                as: 'team'
            }],
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
        db.employee.findByPk(req.params.id)
            .then(
                employee => {
                    if (!employee) {
                        return res.status(404).json({ message: 'Employee Not Found' });
                    }
                    employee.update({

                        ...employee,
                        ...req.body
                    })
                        .then(() => { return res.status(200).json(employee) })
                        .catch((error) => res.status(400).send(error));
                })
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Something went wrong ")
    }
}
//  deleteEmployee
module.exports.deleteEmployee = (req, res, next) => {
    try {
        db.employee.findByPk(req.params.id)
            .then(employee => {
                if (!employee) {
                    return res.status(400).send({ message: 'employee Not Found', });
                }
                team.destroy()
                    .then(() => res.status(200).json({ message: "employee destroyed successfully!" }))
                    .catch(error => res.status(400).send(error));
            })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Something went wrong ")
    }
}

module.exports.deleteAllEmployee = (req, res, next) => {
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