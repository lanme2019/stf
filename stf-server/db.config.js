// module.exports = {
//     host     : 'localhost',
//     user     : 'root',
//     password : 'samxiaoguai',
//     database : 'ceshi'
//   }

var mysql = require('mysql');

function createConnection() {
    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'samxiaoguai',
      database: 'ceshi'
    });
    return connection;
}
module.exports.createConnection = createConnection;