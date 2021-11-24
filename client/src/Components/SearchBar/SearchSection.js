import React, { useState, useContext, useEffect } from "react";
// @material-ui/core components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ReplayIcon from "@mui/icons-material/Replay";
import {
    InputAdornment,
    makeStyles,
} from "@material-ui/core/";
// nodejs library that concatenates classes

import Search from "@material-ui/icons/Search";
// core components
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem.js";
import Card from "../Card/Card";
import CardHeader from "../Card/CardHeader.js";
import CardBody from "../Card/CardBody.js";
import CardFooter from "../Card/CardFooter.js";
import Button from "../CustomButtons/Button";
import CustomInput from "../CustomInput/CustomInput";
import { TweetContext } from "../../Context/TweetContext";
import TotalSearchChart from "../Chart/TotalSearchTweet";
import styles from "./searchStyles";
import GoogleTrends from "../TrendingKeyword/GoogleTrending";
import Notification from "../Notification/Notification";
const useStyles = makeStyles(styles);


export default function SectionLogin() {
    const classes = useStyles();
    const [loaded, setLoaded] = useState(false);
    const { keyword, setKeyword, streamTime, tweetCounts } =
        useContext(TweetContext);
    const [input, setInput] = useState();
    const [displayNoti, setDisplayNoti] = useState(false);
    const [closeNoti, setCloseNoti] = useState(false);

    useEffect(() => {
        if (tweetCounts > -1 && !displayNoti && !closeNoti) {
            setDisplayNoti(true);
        }
    }, [tweetCounts, displayNoti, closeNoti])

    const inputSearch = () => {
        if (!input) {
            alert("Missing keyword");
            return;
        }
        const arr = input.trim().split(" ");
        if (arr.length !== 1) {
            alert("ony can search for one word")
            return;
        }
        setKeyword({ input });
        setLoaded(true);
        console.log(keyword);
        console.log(streamTime);
    };

    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <GridContainer justifyContent="center">
                    <GridItem xs={12} sm={12} md={4}>
                        {loaded ? (
                            <div className={classes.wrapper}>
                                <div className={classes.noti}>
                                    <Notification status={tweetCounts === 0 ? 'error' : 'success'} counts={tweetCounts} display={displayNoti} setDisplay={setDisplayNoti} closeNoti={closeNoti} setCloseNoti={setCloseNoti} />
                                </div>
                                <Box sx={{ flexGrow: 1 }} className={classes.appbar}>
                                    <AppBar position="static" className={classes.appbar}>
                                        <Toolbar>
                                            <IconButton
                                                size="large"
                                                edge="start"
                                                color="inherit"
                                                aria-label="menu"
                                                sx={{ mr: 2 }}
                                            >
                                                <MenuIcon />
                                            </IconButton>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                sx={{ flexGrow: 1 }}
                                            >
                                                Back to Search
                                            </Typography>
                                            <Button
                                                color="primary"
                                                onClick={() => window.location.reload()}
                                            >
                                                <ReplayIcon />
                                            </Button>
                                        </Toolbar>
                                    </AppBar>
                                </Box>
                                <div className={classes.chart}>
                                    <Card>
                                        <TotalSearchChart />
                                    </Card>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Card>
                                    <form className={classes.form}>
                                        <CardHeader color="primary" className={classes.cardHeader}>
                                            <h2>Welcome to Twitter Enalyst</h2>
                                        </CardHeader>
                                        <CardBody>
                                            <CustomInput
                                                labelText="Type a word to analyze..."
                                                id="first"
                                                formControlProps={{
                                                    fullWidth: true,
                                                }}
                                                inputProps={{
                                                    type: "text",
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Search className={classes.inputIconsColor} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                onChange={(e) => setInput(e.target.value)}
                                            />
                                        </CardBody>

                                        <CardFooter className={classes.cardFooter}>
                                            <Button
                                                simple
                                                color="primary"
                                                size="lg"
                                                onClick={inputSearch}
                                            >
                                                Search
                                            </Button>
                                        </CardFooter>
                                    </form>
                                </Card>
                                <h1>
                                    <Card className={classes.trends}>
                                        <GoogleTrends />
                                    </Card>
                                </h1>
                            </div>
                        )}
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    );
}
