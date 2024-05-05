const settings = require('../settings');
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: settings.mysql.host,
  database: settings.mysql.database,
  user: settings.mysql.user,
  password: settings.mysql.password
})

connection.connect()

module.exports = connection