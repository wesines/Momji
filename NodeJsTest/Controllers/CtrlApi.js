
const express = require("express")
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
            id: req.body.idTeam,
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
                return res.status(200).json(team)
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
        return db.team.findById(req.params.id)
            .then(
                team => {
                    if (!team) {
                        return res.status(404).json({
                            message: 'Customer Not Found',
                        });
                    }
                    return team.update({
                        name: req.body.name,
                        description: req.body.description,
                        created_at: req.body.created_at,
                        updated_at: req.body.updated_at
                    })
                        .then(() => res.status(200).json(team))
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
            .findById(req.params.id)
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


//add Employee
module.exports.createEmployee = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }

}
//  getEmployeeByID
module.exports.getEmployeeByID = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }
}

//get All Employee
module.exports.getAllEmployee = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }
}


//  editEmployee
module.exports.editEmployee = async (req, res, next) => {
    try {

    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong ")
    }
}

//  deleteEmployee
module.exports.deleteEmployee = async (req, res, next) => {
    try {

    } catch (err) {

        console.log(err);
        res.status(500).send("Something went wrong ")
    }
}