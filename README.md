# LIRI
 LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.


# Prerequisites
*  Node JS
*  node-spotify-api NPM module
*  twitter NPM Module

# How To Run LIRI
*  Navigate to the folder where liri.js lives

Usage: node liri.js <cmd> <arg>
 where cmd is one of:
   spotify-this-song   : Look up a song (<args>) on spotify and display info about it
   movie-this          : Look up a movie (<args>) on omdb and display info about it
   my-tweets           : Look up your last 20 tweets on Twitter and display them
   do-what-it-says     : Randomly execute one of the commands with some arbitrary argument

 args is everything following <cmd> and need not be quoted

 # Examples
      $ node liri.js movie-this the shining
      Title of the movie:                     The Shining
      Year the movie came out:                1980
      IMDB Rating of the movie:               8.4
      Rotten Tomatoes Rating of the movie:    The Shining
      Country where the movie was produced:   UK, USA
      Language of the movie:                  English
      Plot of the movie:                      A family heads to an isolated hotel for the winter where an evil spiritual presence influences the father into violence, while his psychic son sees horrific forebodings from the past and of the future.
      Actors in the movie:                    Jack Nicholson, Shelley Duvall, Danny Lloyd, Scatman Crothers

      $ node liri.js spotify-this-song my name is mud
      Artist(s): Primus
      Song Name: My Name Is Mud
      Preview Link: null
      Album: Pork Soda

      $ node liri.js my-tweets
      RT @F5Security: “5 myths of API security”: https://t.co/US3lnfD27l via @CSOonline #cybersecurity
      RT @F5Security: "Combating seven common threat techniques in 2018" by @F5NetworksEMEA's @Keiron_Shep: https://t.co/H7kEb9IIKL via @IT_SecGu…
      RT @F5Security: "There is no such thing as a non-critical app when it comes to #security" by @lmacvittie: https://t.co/YyRScEPqER #cloud #W…
      RT @NakedWinesCOM: The way 99% of people choose their wine is hilarious  https://t.co/Hcvgz3WaCB
      RT @F5Security: Calling #RSAC attendees: Don’t miss the presentation from F5’s @dholmesf5 on “Secrets of the Encrypted Internet—Worldwide C…
      RT @F5Security: [Blog] @F5Networks' SVP &amp; GM of Security, Ram Krishnan, discusses the details surrounding the launch of F5 Advanced #WAF, "…
      RT @F5Security: "What makes a #WAF advanced?" by @F5Networks' @bamchenry: https://t.co/DYvIClyELz #AppSec https://t.co/S86EYImTQ3
      RT @F5Security: Uncover #IoT security trends in the @F5Labs Threat Analysis Report, “The Hunt for IoT: The Growth and Evolution of Thingbot…
      RT @RimoteSaS: #IT #Security issues with #OpenSSL, a Secure Sockets Layer toolkit https://t.co/ffDEYalFrR https://t.co/tjnqFGLNSq Please up…
      RT @abacohosting: Our SSL or Secure Sockets Layer certificates will protect confidential data on your website including passwords, payment…
      RT @betterwebservic: SSL (Secure Sockets Layer) https://t.co/r345C2qemB
      RT @ubuntu: With only two weeks to go until Ubuntu 18.04, here are the latest updates from the server team! https://t.co/Ye0NaBch6Y https:/…
      RT @ExtraHop: Next week we’re heading to San Francisco for #RSAC. Drop by South Expo Booth 2307 to say hello! https://t.co/q8NeDwiN78 https…
      RT @Azure: This week’s #AzureTrivia question is here. So, GAME ON. Answer for your chance to win cool prizes! https://t.co/WLBogBiDF0
      RT @whitehatsec: The combination of #microservices and #APIs is the fabric of #applications. WhiteHat CEO @CraigHinkley looks at how WhiteH…
      RT @megazone: I'm not sure if it is good or bad that I got this immediately.  And laughed. https://t.co/YUXoRH2lEA
      RT @iamdevloper: when you're reminded you wrote the world's biggest social network in PHP https://t.co/bnXqNeDjiC
      RT @WalkMeInc: Eliminate User Confusion with Customized On-Screen Guidance. https://t.co/1DyoLCoWdh
      RT @devcentral: Helpful #CodeShare from @WorldTechIT SA Mark Wall:  This simple @ansible playbook will allow you to automate the entire F5…
      RT @devcentral: Another great #CodeShare from F5er John Huttley showing how to do 'APM session caching for Web API's'  This is a Session ca…5er John Huttley showing how to do 'APM session caching for Web 

# Logging
  A record of **_all_** commands and output is kept in log.txt in the same directory as liri.js.