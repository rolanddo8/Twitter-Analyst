import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import styles from "./tweetStyles";
import { TweetContext } from "../../Context/TweetContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TweetEmbed from "react-tweet-embed";
import "./TweetGrid/_plugin-react-slick.scss";

import GridContainer from "./TweetGrid/TweetGridContainer";
import GridItem from "./TweetGrid/TweetGridItem";
import { getSearchTwitter } from '../../Services/GetSearchTwitter'
import { getTrendingKeyword } from '../../Services/GetTrendingKeyword'
import { getUserTrendingKeyword } from '../../Services/GetUserTrend'


const useStyles = makeStyles(styles);

export default function Tweets() {
    const {
        keyword,
        streamTime,
        idTweet,
        setIdTweet,
        setScoreSearchTweet,
        setGoogleTrends,
        setUserTrend,
        setTweetCounts
    } = useContext(TweetContext);

    useEffect(() => {
        if (keyword.input) {
            getSearchTwitter(keyword.input, streamTime.timerStream)
                .then((res) => {
                    const data = res.data.data;
                    setTweetCounts(data.length)
                    res.data.data.forEach(tweet => setIdTweet((idTweet) => [...idTweet, tweet.id_str]))
                    res.data.data.forEach(tweet => setScoreSearchTweet((scoreTweet) => [...scoreTweet, tweet.num_score]))
                })
                .catch((err) => console.log(err));
        }
    }, [keyword, setIdTweet, setScoreSearchTweet, setTweetCounts, streamTime.timerStream]);
    useEffect(() => {
        getTrendingKeyword().then(res => {
            setGoogleTrends(res)
        })
        getUserTrendingKeyword().then(res => {
            setUserTrend(res);
        })
    }, [setGoogleTrends, setUserTrend])

    const classes = useStyles();
    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <h1 className="title-h1"> Twitter Posts Found</h1>
                <div className="hide-scroll">
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
                            {idTweet.length ? (
                                idTweet.map((id, key) => {
                                    if (key < 50) {
                                        return (
                                            <TweetEmbed
                                                id={id}
                                                placeholder={"loading"}
                                                className={classes.tweet}
                                            />
                                        );
                                    }
                                    return null;
                                })
                            ) : (
                                <div className="tweet-header">
                                    <h1>Search to view them here</h1>
                                </div>
                            )}
                        </GridItem>
                    </GridContainer>
                </div>

            </div>
        </div>
    );
}
