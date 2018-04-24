require("dotenv").config();
var inquirer      = require('inquirer');
const chalk       = require('chalk');
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
const validCommands = [
    'my-tweets',
    'spotify-this-song',
    'movie-this',
    'do-what-it-says'
]

getInput();


function getInput() {
    console.log('\n');
    inquirer.prompt([
        {
            type: 'list',
            name: 'initMsg',
            message: 'Hi, I am LIRI.  Choose one of the commands below.',
            choices: [
                'my-tweets',
                'spotify-this-song',
                'movie-this',
                'do-what-it-says',
                'exit'
            ]
        }
    ])
    .then(function(inquirerResponse) {
        executeUserCmd(inquirerResponse.initMsg)
    })
    
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
    console.log('Usage: <cmd> <arg>')
    console.log(' where cmd should be one of:')
    console.log('   spotify-this-song   : Look up a song (<args>) on spotify and display info about it')
    console.log('   movie-this          : Look up a movie (<args>) on omdb and display info about it')
    console.log('   my-tweets           : Look up your last 20 tweets on Twitter and display them')
    console.log('   do-what-it-says     : Randomly execute one of the commands with some arbitrary argument')
    console.log('      ')
    console.log(' args is everything following <cmd> and need not be quoted')
}
function executeUserCmd(cmd,args) {
    console.log('\n');
    switch (cmd) {
        case 'my-tweets':
            client.get(
                'statuses/user_timeline',
                { screen_name: 'keith66fuller', count: 20 },
                function(error, tweets, response) {
                    if (!error) {
                        tweets.forEach(element => { twinLog(element.text) });
                    } else {
                        res.status(500).json({ error: error });
                    }
                    getInput();
                }
            );
            break;
        case 'spotify-this-song':
            var p1 = new Promise( (resolve,reject) => {
                if (! args) {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'song',
                            message: 'Type the name of the song to Spotify. ',
                            validate: function (input) { return (input != "") },
                            default: 'Ace of Base'
                        }
                    ]).then(function(inquirerResponse) {
                        resolve(inquirerResponse.song);
                    })
                } else {
                    resolve(args);
                }
            })

            p1.then((song) => {
                spotify.search({
                    type: 'track',
                    query: song,
                    limit: 1
                }, function(err, data) {
                    if (err) { return twinLog('Error occurred: ' + err) };
                    [
                        ['Song Name     ', data.tracks.items[0].name],
                        ['Preview Link  ', data.tracks.items[0].preview_url],
                        ['Album         ', data.tracks.items[0].album.name]
                    ].forEach(element => {
                        twinLog(`${element[0]}: ${element[1]}`);
                    });
                    getInput();
                });
            });
            break;

        case 'movie-this':
            var p1 = new Promise( (resolve,reject) => {
                if (! args) {
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'movie',
                            message: 'Type the name of the movie. ',
                            validate: function (input) { return (input != "") },
                            default: 'Mr. Nobody'
                        }
                    ]).then(function(inquirerResponse) {
                        resolve(inquirerResponse.movie);
                    })
                } else {
                    resolve(args);
                }
            })

            p1.then((movie) => {
                var reqParams = querystring.stringify({ t: movie });
                http.get(`http://www.omdbapi.com/?apikey=${omdbApiKey}&${reqParams}`, (resp) => {
                  let data = '';

                  // A chunk of data has been recieved.
                  resp.on('data', (chunk) => {
                    data += chunk;
                  });

                  // The whole response has been received. Print out the result.
                  resp.on('end', () => {
                    data=JSON.parse(data);
                    [
                        ['Title of the movie                    ',  data.Title],
                        ['Year the movie came out               ',  data.Year],    
                        ['IMDB Rating of the movie              ',  data.imdbRating],     
                        ['Rotten Tomatoes Rating of the movie   ',  data.Title],                
                        ['Country where the movie was produced  ',  data.Country],                 
                        ['Language of the movie                 ',  data.Language],  
                        ['Plot of the movie                     ',  data.Plot],                
                        ['Actors in the movie                   ',  data.Actors]
                    ].forEach(element => {
                        twinLog(chalk.black(chalk.bgWhite(element[0]+':'))+'                    '+chalk.bold(element[1]));    
                    });


                    
                    getInput();
                  });
                }).on("error", (err) => {
                    twinLog("Error: " + err.message);
                    getInput();
                });

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
                console.log(`Random Command --> ${randomTxt[0].cmd} ${randomTxt[0].args}`)
                executeUserCmd(randomTxt[0].cmd,randomTxt[0].args);
                return;
            })
            break;
        case 'exit':
            twinLog('Adios my fring');
            break;
    }
}




