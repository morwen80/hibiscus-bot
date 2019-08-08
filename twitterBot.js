const twit = require('twit');

const config = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
}

const Twitter = new twit(config);

let retweet = function() {
    let params = {
        q: '#flower OR #flowers OR #florist OR #floralphotography OR #floral',
        result_type: 'mixed',
        lang: 'en',
        filter: 'safe'
    }

    Twitter.get('search/tweets', params, function(err, data) {
          // if there is no error
          if (!err) {
             // loop through the first 4 returned tweets
            for (let i = 0; i < 4; i++) {
              // iterate through those first four defining a rtId that is equal to the value of each of those tweets' ids
            let rtId = data.statuses[i].id_str;
              // the post action

            Twitter.post('statuses/retweet/:id', {id: rtId}, function(err, response) {
              if (response) {
                console.log('Successfully retweeted');
              }
              if (err) {
                console.log(err);
              }
              else {
                  // catch all log if the search could not be executed
                console.log('Could not search tweets.');
              }
            });

            Twitter.post('favorites/create', {id: rtId}, function(err, response){
              // if there was an error while 'favorite'
              if(err){
                console.log('CANNOT BE FAVORITED');
              }
              else{
                console.log('FAVORITED!');
              }
            });
          }
        }

      });
  }


let followBack = function(){
  Twitter.post('friendships/create', {
  screen_name: 'HibiscusBot'
}, (err, data, response) => {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
});
}

retweet();
// favourite();
followBack();

setInterval(retweet, 600000)
