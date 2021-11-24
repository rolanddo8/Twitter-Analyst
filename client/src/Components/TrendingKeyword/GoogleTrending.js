import React, { useContext } from "react";
import NavPills from "../NavPil/NavPil";
import GoogleIcon from "@mui/icons-material/Google";
import LanguageIcon from "@mui/icons-material/Language";
import { TweetContext } from "../../Context/TweetContext";
import Badge from "../Badge/Badge";
const GoogleTrends = () => {
    const { googleTrends, userTrend } = useContext(TweetContext);
    const color = ["primary", "warning", "danger", "success", "info", "rose"];
    return (
        <NavPills
            color="warning"
            horizontal={{
                tabsGrid: { xs: 12, sm: 4, md: 4 },
                contentGrid: { xs: 12, sm: 8, md: 8 },
            }}
            tabs={[
                {
                    tabButton: "Google Trending Keywords",
                    tabIcon: GoogleIcon,
                    tabContent: (
                        <span>
                            {googleTrends?.map((keyword, i) => {
                                if (i < 30) {
                                    return (
                                        <Badge
                                            color={color[Math.floor(Math.random() * color.length)]}
                                            key={i}
                                        >
                                            {keyword.keyword}
                                        </Badge>
                                    );
                                }
                                return null;
                            })}
                        </span>
                    ),
                },
                {
                    tabButton: "Trending Keywords on this website",
                    tabIcon: LanguageIcon,
                    tabContent: (
                        <span>
                            {userTrend?.map((keyword, i) => {
                                if (i < 30) {
                                    return (
                                        <Badge
                                            color={color[Math.floor(Math.random() * color.length)]}
                                            key={i}
                                        >
                                            {keyword}
                                        </Badge>
                                    );
                                }
                                return null;
                            })}
                        </span>
                    ),
                },
            ]}
        />
    );
};

export default GoogleTrends;
