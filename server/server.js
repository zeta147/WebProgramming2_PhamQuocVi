const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.Vocab = require('./api/models/VocabModel')
const routes = require('./api/routes/VocabRoutes');

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://vipham:mongodb1472004!@clusterwebprogramming2.brs5t.mongodb.net/vocab-builder?retryWrites=true&w=majority&appName=ClusterWebProgramming2',
    {useNewUrlParser: true
});

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

routes(app);
app.listen(port);
app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found`});
});

console.log(`Server started on port ${port}`);
