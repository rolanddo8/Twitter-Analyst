const Sentiment = require("sentiment");

var sentiment = new Sentiment();

//Send Tweet Text to Sentiment Analysis
sentiment.getSentiment = (tweet) => {
  const sentimentScore = sentiment.analyze(tweet.text);

  numScore = sentimentScore.score;
  if (numScore < 0) {
    score = "negative";
  } else if (numScore > 0) {
    score = "positive";
  } else {
    score = "neutral";
  }

  return sentiment.appendSentiment(tweet, score, numScore);
};

//Send sentiment score of tweet to Client
sentiment.appendSentiment = (tweet, sentiment, numScore) => {
  var scoreTweet = {
    sentiment: sentiment,
    num_score: numScore,
    created_at: tweet.created_at,
    timestamp_ms: tweet.timestamp_ms,
    id_str: tweet.id_str,
    text: tweet.text,
  };

  // console.log(scoreTweet.text);

  return scoreTweet;
};

module.exports = sentiment;
