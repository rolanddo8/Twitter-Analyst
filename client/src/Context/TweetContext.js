import React, { createContext, useState, useRef } from "react";

export const TweetContext = createContext();

const TweetProvider = ({ children }) => {
  const [keyword, setKeyword] = useState({});
  const [streamTime, setStreamTime] = useState({});
  const [trendingKeyword, setTrendingKeyword] = useState({});
  const [Tweet, setTweet] = useState({});
  const [idTweet, setIdTweet] = useState([]);
  const [scoreTweet, setScoreTweet] = useState([]);
  const [scoreSearchTweet, setScoreSearchTweet] = useState([]);
  const [googleTrends, setGoogleTrends] = useState([]);
  const [userTrend, setUserTrend] = useState([]);
  const [achirveScore, setAchirveScore] = useState({});
  const [summary100PostScore, setSummary100PostScore] = useState({});
  const [tweetAlert, setTweetAlert] = useState(false);
  const [tweetCounts, setTweetCounts] = useState(-1);
  const dataRef = useRef([]);
  // console.log(keyword);
  return (
    <TweetContext.Provider
      value={{
        keyword,
        setKeyword,
        streamTime,
        setStreamTime,
        setTrendingKeyword,
        trendingKeyword,
        Tweet,
        setTweet,
        idTweet,
        setIdTweet,
        dataRef,
        scoreTweet,
        setScoreTweet,
        scoreSearchTweet,
        setScoreSearchTweet,
        achirveScore,
        setAchirveScore,
        googleTrends,
        setGoogleTrends,
        summary100PostScore, setSummary100PostScore,
        tweetAlert,
        setTweetAlert,

        userTrend, setUserTrend,

        tweetCounts, setTweetCounts

      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export default TweetProvider;
