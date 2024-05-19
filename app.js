const mongoConnect = require('./connection/database');
const express = require('express');
const bodyParser = require('body-parser');
const configuration = require('./configuration/configure');
console.clear();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
configuration.configure(app);

mongoConnect.connect(() => {
    app.listen(3000, (err) => {
        if (err)
            console.log(err);
        console.log("Server started");
    });
});