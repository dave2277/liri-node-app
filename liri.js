
//Define the modules

var keys = require('./keys');
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require('request');

//Provide authentication credentials for twitter
var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

//Provide credentials for spotify app
var spotify = new Spotify({
    id: 'c2a92198b88d478d895976de3e190c92',
    secret: '5f64767ea3e24c71907b0539ec5440a3'
});

//Set the initial input property as a variable for the command
var input = process.argv;
var command = input[2];

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
};

//Create the function to get the songs
var getSong = function () {
    var song = input[3];

    spotify.search({type: 'track', query: song, limit: 1}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console.log(data);
        console.log("Artist(s) Name: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
    });

};



if (command == "my-tweets") {
    getTweets();
}

else if (command == "spotify-this-song") {
    getSong();

}

else if (command == "movie-this") {

}

else if (command == "do-what-it-says") {

}

else {
    console.log("Invalid command.")
}