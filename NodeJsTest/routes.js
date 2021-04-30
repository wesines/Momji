const express = require('express');
const router = express.Router();
const CtrlApi = require('./Controllers/CtrlApi');

router.post('/createTeam', CtrlApi.createTeam);
router.post('/createEmployee', CtrlApi.createEmployee);
router.get('/getAllTeam', CtrlApi.getAllTeam);
router.get('/getAllEmployee', CtrlApi.getAllEmployee);
router.get('/getTeamByID/:id', CtrlApi.getTeamByID);
router.get('/getEmployeeByID/:id', CtrlApi.getEmployeeByID);
router.put('/editTeam/:id', CtrlApi.editTeam);
router.put('/editEmployee/:id', CtrlApi.editEmployee);
router.delete('/deleteTeam/:id', CtrlApi.deleteTeam);
router.delete('/deleteTeam/:id', CtrlApi.deleteTeam);
router.delete('/deleteAllTeam', CtrlApi.deleteAllTeam);
router.delete('/deleteAllEmployee', CtrlApi.deleteAllEmployee);


module.exports = router;
