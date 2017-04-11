(function() {

	'use strict';

	// Set Up (Packages, variables, etc.)
	const express = require('express');
	const Twit = require('twit');
	const pug = require('pug');
	const config = require('./config.js');

	var T = new Twit(config);
	var app = express();

	// View Engine, Directories for Static Resources and Templates
	app.use(express.static(__dirname + '/public'));
	app.set('view engine', 'pug');
	app.set('views', __dirname + '/templates');

	
})
