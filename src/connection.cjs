const {Client} = require('pg')

const client = new Client({
    host: "salon.home",
    user: "domotic",
    port: 5432,
    password: "6Msb1wsTHKJGl6JQ7ULtGGNGs",
    database: "domoticdb"
})

module.exports = client
