const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
// const errors = require('feathers-errors');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const service = require('feathers-mongodb');

// Create a feathers instance.
const app = feathers()
  // Enable Socket.io
  .configure(socketio())
  // Enable REST services
  .configure(rest())
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({extended: true}));

  // Connect to your MongoDB instance(s)
MongoClient.connect('mongodb://localhost:27017/feathers-demo').then(function(db){
  // Connect to the db, create and register a Feathers service.

  app.use('/chats', service({
    Model: db.collection('chats'),
    paginate: {
      default: 100,
      max: 100
    }
  }));

  // A basic error handler, just like Express
  // app.use(errors.handler());

  // Start the server
  var server = app.listen(3030);
  server.on('listening', function() {
    console.log('Feathers Message MongoDB service running on 127.0.0.1:3030');
  });
}).catch(function(error){
  console.error(error);
});
