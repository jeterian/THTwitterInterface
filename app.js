'use strict';

// General Setup: Plugins, Variables, Etc.
const express = require('express');
const app = express();
const path = require('path');
const bodyPar = require('body-parser');
const twitter = require('./twitter.js');
const routes = require('../routes/index.js');
const config = require('./config.js');
const Twit = require('twit');
const T = new Twit({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token: config.access_token,
	access_token_secret: config.access_token_secret
});

// View Engine, Static Directory
app.set('views', path.join(__dirname, "..", "views"));
app.set('view engine', 'pug');