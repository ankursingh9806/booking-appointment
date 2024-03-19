const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const sequelize = require('./utils/database');
const userRoute = require('./routes/userRoute');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/get', userRoute);
app.use('/post', userRoute);

sequelize
    .sync()
    .then(result => {
        // console.log(result);
        app.listen(3000);
        console.log('synced with database');
    })
    .catch(err => {
        console.error('unable to sync with database:', err);
    });
sequelize.authenticate()
    .then(result => {
        // console.log(result);
        console.log('connected to database');
    })
    .catch(err => {
        console.error('unable to connect to database:', err);
    });