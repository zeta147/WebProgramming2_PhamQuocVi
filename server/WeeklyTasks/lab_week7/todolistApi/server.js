// Onwer: PhamQuocVi - GCS220283

var express = require('express'), // require mean: import external library
app = express(),
port = process.env.PORT || 3000;
mongoose = require('mongoose'),
Task = require('./api/models/todoListModel'), // created model loading here
bodyParser = require('body-parser');

//mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://vipham:mongodb1472004!@clusterwebprogramming2.brs5t.mongodb.net/?retryWrites=true&w=majority&appName=ClusterWebProgramming2')
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const routes = require('./api/routes/todoListRoutes'); // importing route
routes(app); //regiter the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);