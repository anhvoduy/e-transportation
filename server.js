﻿const express = require('express');
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const constant = require('./lib/constant');
const auth = require('./services/authService');

// Express
const server = express();
server.use(cors())
server.use(cookieParser()); // read cookies (needed for auth)
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// setup server
auth.setup(server);
server.set('port', process.env.PORT || 3000);
server.set('secretKey', constant.secretKey);


// register API
server.use('/api', require('./routes/api'));
server.use('/api/brand', require('./routes/brand'));
server.use('/api/customer', require('./routes/customer'));
server.use('/api/truck', require('./routes/truck'));
server.use('/api/brand', require('./routes/brand'));
server.use('/api/product', require('./routes/product'));
server.use('/api/user', require('./routes/user'));
server.use('/api/group', require('./routes/group'));

// register site collections
server.use('/admin', express.static(path.join(__dirname, 'admin'), { index: 'default.html' }));
server.use('/transport', express.static(path.join(__dirname, 'transport'), { index: 'default.html' }));

const webpath = path.join(__dirname, 'transport'); 
server.use('/', express.static(webpath, { index: 'default.html' }));
server.use('/about-us', express.static(webpath , { index: 'about-us.html' }));
server.use('/contact-us', express.static(webpath, { index: 'contact-us.html' }));
server.use('/service-us', express.static(webpath, { index: 'service-us.html' }));
server.use('/login', express.static(webpath, { index: 'login.html' }));

module.exports = server;