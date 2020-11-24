const http = require('http');
const express = require('express');
const app = express();
require('dotenv').config();
var cookieParser = require('cookie-parser');
var cors = require('cors')
var bodyParser = require('body-parser')
var path = require('path');

const authRoute = require('../server/router/v1/auth.Route');
const studentRoute = require("../server/router/v1/student.Route");
const teacherRoute = require('../server/router/v1/teacher.Route');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/student/static_file', express.static('upload/'));

app.use('/api/v1',cors(),authRoute);
app.use('/api/v1/student',cors(),studentRoute);
app.use("/api/v1/teacher",cors(),teacherRoute);

const port = process.env.DEV_PORT || 3100;

app.listen(port);
