const express = require('express');
const router = express.Router();
const VerifyJWT = require('../config/VerifyJWT');
const ctrlSchtroumpf = require('../controllers/schtroumpf.Controller');


router.post('/createTeam', CtrlApi.createTeam);
router.post('/createEmployee', CtrlApi.createEmployee);
router.get('/getAllTeam', CtrlApi.getAllTeam);
router.get('/getAllEmployee', CtrlApi.getAllEmployee);
router.get('/getTeamByID/:id', CtrlApi.getTeamByID);
router.get('/getEmployeeByID/:id', CtrlApi.getEmployeeByID);
router.put('/editTeam/:id', CtrlApi.editTeam);
router.put('/editEmployee/:id', CtrlApi.editEmployee);
router.delete('/deleteTeam/:id', CtrlApi.deleteTeam);
router.delete('/deleteEmployee/:id', CtrlApi.deleteEmployee);


module.exports = router;
