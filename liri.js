
var twitter = require("twitter");
var spotify = require("spotify-node-api");
var keys = require('./keys');

//Below is the pattern to make API calls:
// twitterKeys.get(path, params, callback);


//What are the various parameters I can choose from-- Check the twitter API Documentation
//What arguments does the call back function take?
//What is my screen name?
//How do I pass a parameter count of 20 tweets?
//With node, all the functions should be declared as variables
//Make use of the return statement


var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});