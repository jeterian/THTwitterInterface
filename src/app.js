'use strict';

// Setup: Variables, Plugins, Etc.
const express = require('express');
const app = express();
const pug = require('pug');
const twit = require('twit');
const config = require('../config.js');
const moment = require('moment');
const port = 8080;

var T = new twit(config);
var tweets = [];
var friends = [];
var profile = [];
var messages = [];

// View Engine & Static Directory
app.set('view engine', 'pug');
app.set('templates', __dirname + '/templates');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render(__dirname + '/templates/main.pug', {
		profile: profile,
		tweets: tweets,
		friends: friends,
		messages: messages
	});
});

// User Profile Data
T.get('account/verify_credentials', (error, data) => {
	const userProfile = {};
	userProfile.name = data.name;
	userProfile.screen_name = data.screen_name;
	userProfile.profile_image_url = data.profile_image_url;
	userProfile.friends_count = data.friends_count;
	profile.push(userProfile);
});

// Retrieve five most recent tweets
T. get('statuses/user_timeline', {count: 5}, (error, data) => {
	data.forEach(tweet => {
		const userTweet = {};
		userTweet.text = tweet.text;
		userTweet.created_at = moment(tweet.created_at).format('M/DD/YY');
		userTweet.retweet_count = tweet.retweet_count;
		userTweet.favorite_count = tweet.favorite_count;
		userTweet.profile_image_url = tweet.user.profile_image_url;
		userTweet.name = tweet.user.name;
		userTweet.screen_name = tweet.user.screen_name;
		tweets.push(userTweet);
	});
});

// Retrieve five most recent friends
T.get('friends/list', {count: 5}, (error, data) => {
	data.users.forEach(user => {
		const listFriends = {};
		listFriends.screen_name = user.screen_name;
		listFriends.name = user.name;
		listFriends.profile_image_url = user.profile_image_url;
		friends.push(listFriends);
	});
});

// Retrieve five most recent direct messages
T.get('direct_messages', (error, data) => {
	data.forEach(message => {
		const dirMessage = {};
		dirMessage.text = message.text;
		dirMessage.name = message.sender.name;
		dirMessage.profile_image_url = message.sender.profile_image_url;
		dirMessage.created_at = moment(message.created_at).format('M/DD/YY');
		messages.push(dirMessage);
	});
});

// Server
app.listen(port, () => {
	console.log("The server is now running on port 8080.");
});