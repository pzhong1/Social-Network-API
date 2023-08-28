//connecting a Node.js application to a MongoDB database.
const { connect, connection } = require('mongoose');//imports the connect and connection methods from the mongoose library.

const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

connect(connectionString);//connects to the MongoDB database using the connectionString

module.exports = connection;