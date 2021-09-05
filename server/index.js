const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/build'));

app.all("/ping", function (req, res) {
    res.send('server is running fine')
});
app.all('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));

});
app.listen(8000, function () {
    console.log('Restaurant server is running at 8000 PORT')
});