// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
// * Make sure you append each command you run to the `log.txt` file. 
// * Do not overwrite your file each time you run a command.

var key = require('./keys.js');
var fs = require("fs");
var event = process.argv[2];
var globe; //Used for either movie or song 

function liri(method, param) {
	switch(method){
		
		case "my-tweets": /*This is what you type in command-line after node liri.js my-tweets */
		twitterProfile();
		break;

		case "spotify-this-song":
		spotifySong(param);
		break;

		case "movie-this":
		movieData(param);
		break;

		case "do-what-it-says":
		doIt();
		break;

	} //Closes out Switch event 
}
/*Create function to get tweets from profile*/
function twitterProfile(){
	/*Use twitter variable to store the twitter API data*/
	var Twitter = require("twitter");
	/*Use client variable to store twitter keys*/
	var client = new Twitter(key.twitterKeys);

	var params = {screen_name: "jusrockinout"};
	client.get('statuses/user_timeline', {count:20}, function(error,tweets,response){
		if(!error){
			console.log("Here are your last 20 tweets:");
			for(var i = 0; i<tweets.length; i++){
				console.log(tweets[i].text);
				console.log(tweets[i].created_at);
				console.log("");
				} //Closes out for-loop 
			} //Closes out if statement 

			else {
				console.log(error);
			}
			
		}); //Closes out function 
}

function spotifySong(param){
	var spotify = require("spotify");
	var song = param || "The Sign Ace of Base";
	spotify.search({type: "track", query: song}, function(err, data){

		if(err){
			console.log('Error occurred: ' + err);
			return;
			} //Closes if statement 
			else {
				var logString = "";
				if(data.tracks.items.length > 0){
					logString += "Artist name: " + data.tracks.items[0].artists[0].name + "\n";
					console.log("Artist name: " + data.tracks.items[0].artists[0].name);
					logString += "Song: " + data.tracks.items[0].name + "\n";
					console.log("Song: " + data.tracks.items[0].name);
					logString += "Song: " + data.tracks.items[0].name + "\n";
					console.log("Link: " + data.tracks.items[0].external_urls.spotify);
					console.log("Album: " + data.tracks.items[0].album.name);
				} //Closes if statement for data.tracks.items.length
				appendLog(logString);
			} //Closes else statement
		}); //Closes out spotify.search 
	}//Closes out spotifySong function 


	function movieData(param){
		var request = require("request");
		var movie = param || "Mr Nobody"
		movie = movie.split(" ").join("+");
		request('http://www.omdbapi.com/?t=' + movie + "&tomatoes=true&plot=short", function (error, response, body) {
			if (!error && response.statusCode == 200) {
		    	console.log(body) // Show the HTML for the Google homepage. 
		 		 } //Closes out if statement 
		 		 var data = JSON.parse(body);
		 		 console.log("Movie title: " + data.Title);
		 		 console.log("Year made: " + data.Year);
		 		 console.log("IMDB Rating: " + data.imdbRating);
		 		 console.log("Country: " + data.Country);
		 		 console.log("Language: " + data.Language);
		 		 console.log("Plot: " + data.Plot);
		 		 console.log("Actors: " + data.Actors);
		 		 console.log("Rotten Tomatoes rating: " + data.tomatoUserRating);
		 		 console.log("Rotten Tomatoes URL: " + data.tomatoURL);
		}) //Closes out request function  
	}; //Closes out movieData function

	
	function doIt() {
		fs.readFile("random.txt", "UTF8", function(err,data){
			if(err){
				console.log("Bummer.There's an error: " + err);
			}

			var dataArray = data.split(',');
			liri(dataArray[0], dataArray[1]);
		});

	}

	liri(process.argv[2], process.argv[3]);