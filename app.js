const express = require('express')
const app = express();

const path = require('path');

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './', 'index.html'));
});

let port = 3000 || process.env;
app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})