const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const bmiRoutes = require('./routes/bmiRoutes.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', bmiRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
