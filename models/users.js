const dbConnection = require('../config/database.js');
// const Connections = require('./config/database.js');
const {DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');


const Users = dbConnection.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true,
    timesTamps: false
});

dbConnection.sync();

const createUser = function (username, password) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    Users.create({username, password});
};
