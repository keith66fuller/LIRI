# LIRI
 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

*How To Run LIRI*

Usage: node liri.js <cmd> <arg>
 where cmd is one of:
   spotify-this        : Look up a song (<args>) on spotify and display info about it
   movie-this          : Look up a movie (<args>) on omdb and display info about it
   my-tweets           : Look up your last 20 tweets on Twitter and display them
   do-what-it-says     : Randomly execute one of the commands with some arbitrary argument

 args is everything following <cmd> and need not be quoted
