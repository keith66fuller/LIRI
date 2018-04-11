require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);
var client =  new Twitter(keys.twitter);

if (process.argv.length>2) {
    var userInput = process.argv[2];
    var moreArgs = process.argv.slice(3,process.argv.length).join(' ');
    // var moreArgs = process.argv[3];

    switch (userInput) {
        case 'my-tweets':
            client.get('statuses/user_timeline', { screen_name: 'keith66fuller', count: 20 }, function(error, tweets, response) {
                if (!error) {
                    // console.log(tweets);
                    tweets.forEach(element => {
                        console.log(element.text);
                    });
                }
                else {
                res.status(500).json({ error: error });
                }
            });
            break;
        case 'spotify-this-song':
            var songQuery = 'Ace of Base';
            if (moreArgs != "") { songQuery = moreArgs }
            spotify.search({
                type: 'track',
                query: songQuery,
                limit: 1
            }, function(err, data) {
                if (err) {
                return console.log('Error occurred: ' + err);
                }
            
                console.log(`Artist(s): ${data.tracks.items[0].artists[0].name}`);
                console.log(`Song Name: ${data.tracks.items[0].name}`);
                console.log(`Preview Link: ${data.tracks.items[0].preview_url}`);
                console.log(`Album: ${data.tracks.items[0].album.name}`);
            });
            break;
        case 'movie-this':
            
            break;
        case 'do-what-it-says':
            
            break;
    
        default:
            break;
    }

}




// { created_at: 'Wed Apr 11 21:25:15 +0000 2018',
// id: 984180604471337000,
// id_str: '984180604471336966',
// text: 'Recommended read on @Medium: “Node.js can HTTP/2 push!” https://t.co/VliSjdgw9C',
// truncated: false,
// entities: [Object],
// metadata: [Object],
// source: '<a href="https://ifttt.com" rel="nofollow">IFTTT</a>',
// in_reply_to_status_id: null,
// in_reply_to_status_id_str: null,
// in_reply_to_user_id: null,
// in_reply_to_user_id_str: null,
// in_reply_to_screen_name: null,
// user: [Object],
// geo: null,
// coordinates: null,
// place: null,
// contributors: null,
// is_quote_status: false,
// retweet_count: 0,
// favorite_count: 0,
// favorited: false,
// retweeted: false,
// possibly_sensitive: false,
// lang: 'en' },