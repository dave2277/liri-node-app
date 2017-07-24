
//Define the modules
var keys = require('./keys');
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require('request');
var fs = require('fs');


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

//Create the function to get the tweets.  Is there a way to display this in reverse order, e.g., oldest to newest?
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
    var song = '"' + process.argv.slice(3).join(" ") + '"';


    if (!song){
        song = "The Sign";
    }

//Is it possible to be more granular in the search here, and pass songs AND artists?  NPM instructions suggest
    //either track, artist, OR title.  Just putting in the track name doesn't return Ace of Base track.
    spotify.search({type: 'track', query: song, limit: 1}, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist(s) Name: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
    });

};

//Create function to get movies from the OMDB node application
var getMovie = function () {
    var movie = input[3];

    if (movie === undefined) {

        var options = {
            url: 'http://www.omdbapi.com/?apikey=40e9cece&t=Mr.+Nobody&tomatoes=true',
            method: 'GET'
        };

    } else {

        options = {
            url: 'http://www.omdbapi.com/?apikey=40e9cece&t=' + movie + '&tomatoes=true',
            method: 'GET'
        };

    }

        request(options, function (err, res, body) {
            let json = JSON.parse(body);
            // console.log(json);
            console.log("* Title: " + json.Title);
            console.log("* Year: " + json.Year);
            console.log("* IMDB Rating: " + json.imdbRating);
            console.log("* Country: " + json.Country);
            console.log("* Language: " + json.Language);
            console.log("* Plot: " + json.Plot);
            console.log("* Actors: " + json.Actors);
            console.log("* Rotten Tomatoes Link: " + json.tomatoURL);
        });

};

//Create the do-what-it-says function
var thatWay = function () {

    fs.readFile('random.txt', 'utf8', function(err, data) {
        var split = data.split(",")

        command = split[0];
        input[3] = split[1];
        getSong();
    });

}


//Perform the appropriate search based on which proc.argv command is passed

        if (command == "my-tweets") {
            getTweets();
        }

        else if (command == "spotify-this-song") {
            getSong();

        }

        else if (command == "movie-this") {
            getMovie();

        }

        else if (command == "do-what-it-says") {
            thatWay();
        }

        else {
            console.log("Invalid command.")
        }