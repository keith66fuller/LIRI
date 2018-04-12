require("dotenv").config();
const http        = require('http');
const fs          = require('fs');
const querystring = require('querystring');
var Spotify       = require("node-spotify-api");
var Twitter       = require("twitter");
var keys          = require('./keys.js');
var spotify       = new Spotify(keys.spotify);
var client        = new Twitter(keys.twitter);
var omdbApiKey    = keys.omdbApiKey;
var randomTxt     = [];


if (process.argv.length>2) {
    executeUserCmd(process.argv[2],process.argv.slice(3,process.argv.length).join(' '));
} else {
    fileLog('LIRI called with no arguments whatsoever.');
    usage();
}

// For the bonus
function twinLog(msg) {
    console.log(msg);
    fileLog(msg)
}
function fileLog(msg){
    fs.appendFile('log.txt', '\n' + msg, (err) => {  
        if (err) throw err;
    });
}

function usage() {
    
    console.log('Usage: node liri.js <cmd> <arg>')
    console.log(' where cmd is one of:')
    console.log('   spotify-this        : Look up a song (<args>) on spotify and display info about it')
    console.log('   movie-this          : Look up a movie (<args>) on omdb and display info about it')
    console.log('   my-tweets           : Look up your last 20 tweets on Twitter and display them')
    console.log('   do-what-it-says     : Randomly execute one of the commands with some arbitrary argument')
    console.log('      ')
    console.log(' args is everything following <cmd> and need not be quoted')
}
function executeUserCmd(cmd,args) {
    fileLog(`LIRI executeUserCmd called with command ${cmd} with args >${args}<`)
    switch (cmd) {
        case 'my-tweets':
            client.get('statuses/user_timeline', { screen_name: 'keith66fuller', count: 20 }, function(error, tweets, response) {
                if (!error) {
                    // twinLog(tweets);
                    tweets.forEach(element => {
                        twinLog(element.text);
                    });
                }
                else {
                res.status(500).json({ error: error });
                }
            });
            break;
        case 'spotify-this-song':
            var songQuery = 'Ace of Base';
            if (args != "") { songQuery = args }
            spotify.search({
                type: 'track',
                query: songQuery,
                limit: 1
            }, function(err, data) {
                if (err) {
                    return twinLog('Error occurred: ' + err);
                }
                twinLog(`Artist(s): ${data.tracks.items[0].artists[0].name}`);
                twinLog(`Song Name: ${data.tracks.items[0].name}`);
                twinLog(`Preview Link: ${data.tracks.items[0].preview_url}`);
                twinLog(`Album: ${data.tracks.items[0].album.name}`);
            });
            break;
        case 'movie-this':
            var movieQuery = 'Mr. Nobody';
            if (args != "") { movieQuery = args }
            var reqParams = querystring.stringify({ t: movieQuery });
            http.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&${reqParams}`, (resp) => {
              let data = '';

              // A chunk of data has been recieved.
              resp.on('data', (chunk) => {
                data += chunk;
              });

              // The whole response has been received. Print out the result.
              resp.on('end', () => {
                data=JSON.parse(data);
                twinLog(`Title of the movie:                     ${data.Title}`);
                twinLog(`Year the movie came out:                ${data.Year}`);    
                twinLog(`IMDB Rating of the movie:               ${data.imdbRating}`);     
                twinLog(`Rotten Tomatoes Rating of the movie:    ${data.Title}`);                
                twinLog(`Country where the movie was produced:   ${data.Country}`);                 
                twinLog(`Language of the movie:                  ${data.Language}`);  
                twinLog(`Plot of the movie:                      ${data.Plot}`);                
                twinLog(`Actors in the movie:                    ${data.Actors}`);
              });

            }).on("error", (err) => {
              twinLog("Error: " + err.message);
            });
            break;
        case 'do-what-it-says':
            fs.readFile('random.txt', 'utf8', function(err, data) {
                if (err) throw err;
                data.split('\n').forEach(element => {
                    randomTxt.push({
                        cmd:    element.split(',')[0],
                        args:   element.split(',')[1]
                    });
                });
                //Randomize the array
                for (let i = randomTxt.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [randomTxt[i],randomTxt[j]] = [randomTxt[j],randomTxt[i]];
                }
                executeUserCmd(randomTxt[0].cmd,randomTxt[0].args);
            })
            break;
    
        default:
            fileLog(`LIRI called with bogus command ${cmd}`);
            usage();
            break;
    }
}


