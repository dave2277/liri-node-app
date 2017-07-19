
//Define the modules

var keys = require('./keys');
var Twitter = require("twitter");
// var spotify = require("spotify-node-api");
var request = require('request');

//Provide authentication credentials

var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

//Create the function to get the tweets

var getTweets = function() {

    var params = {screen_name: "DavidGray61", count: 20};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < params.count; i++ ) {
                console.log(tweets[i].text, tweets[i].created_at);
            }
        } else {
            console.log(error);
        }
    });
}

var input = process.argv;
var command = input[2];

if (command == "my-tweets") {
    getTweets();
}

else if (command == "") {

}

else if (command == "") {

}

else if (command == "") {

}

else {
    console.log("Invalid command.")
}