
const { User } = require('../models');
const userData =
[
    {
        "first_name":"John",
        "last_name":"Doe",
        "login_id":"johndoe",
        "password":"password"
    },
    {
        "first_name":"Jackie",
        "last_name":"Jefferson",
        "login_id":"johndoe",
        "password":"password"
    },
    {
        "first_name":"Sam",
        "last_name":"Jefferson",
        "login_id":"johndoe",
        "password":"password"
    },
    {
        "first_name":"Ruth",
        "last_name":"Smith",
        "login_id":"johndoe",
        "password":"password"
    },
    {
        "first_name":"George",
        "last_name":"Jefferson",
        "login_id":"johndoe",
        "password":"password"
    }

]

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;