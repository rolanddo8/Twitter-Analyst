var express = require('express');
var router = express.Router();
const googleTrends = require('google-trends-api');


module.exports = router;

const getTrends = async () => {
    return await googleTrends.realTimeTrends(
        {
            geo: "AU",
            category: "all",
        }
    );
}

const getUniqueItemsByProperties = (items, propNames) => {
    const propNamesArray = Array.from(propNames);

    return items.filter((item, index, array) =>
        index === array.findIndex(foundItem => isPropValuesEqual(foundItem, item, propNamesArray))
    );
};
router.get('/', async (req, res, next) => {

    getTrends()
        .then(results => {
            const arr = [];
            const trends = JSON.parse(results);
            trends.storySummaries.trendingStories.forEach((trend) => {
                const result = {};
                if (trend.entityNames.length >= 1) {
                    trend.entityNames.forEach((keyword) => {
                        keyword = keyword.split(" ").join("-");
                        result.keyword = keyword;
                        arr.push(result);
                    })
                }
            });
            let uniqueChars = [];
            arr.forEach((c) => {
                if (!uniqueChars.includes(c)) {
                    uniqueChars.push(c);
                }
            });
            res
                .status(200)
                .json({ error: false, data: uniqueChars });
        })
        .catch(err => { console.log(err); });


});

module.exports = router;