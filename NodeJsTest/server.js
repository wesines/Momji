const express = require('express')

//const getConnection = require("./config/db")
const routesList = require('./routes');

const app = express();
//getConnection()
const db = require('./config/db.config.js');

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync with { force: true }');
});
app.listen(8080, () => {
    console.log("Server connected")
})
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/momji', routesList);


app.get('/', (req, res) => {
    console.log("every body can see this")
})


