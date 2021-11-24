// import { Console } from "console";
import React, { useContext, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { TweetContext } from "../../Context/TweetContext";
const sumNeg = (arr = []) => {
  const creds = arr.reduce((acc, val) => {
    let [count, sum] = acc;
    if (val < 0) {
      sum += val;
      count++;
    };
    return [count, sum];
  }, [0, 0]);
  return creds;
};
const sumPos = (arr = []) => {
  const creds = arr.reduce((acc, val) => {
    let [count, sum] = acc;
    if (val > 0) {
      sum += val;
      count++;
    };
    return [count, sum];
  }, [0, 0]);
  return creds;
};

const sumNeural = (arr = []) => {
  const creds = arr.reduce((acc, val) => {
    let [count] = acc;
    if (val === 0) {
      count++;
    };
    return [count];
  }, [0, 0]);
  return creds;
};


const options = {
  options: {
    plugins: {
      legend: {
        display: false
      }
    }
  },
  legend: {
    display: false,
  },
  plugins: {
    legend: {
      display: false
    }
  },
  indexAxis: "x",
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,

};
const TotalSearchChart = () => {

  const { scoreSearchTweet, setAchirveScore, summary100PostScore } = useContext(TweetContext);
  const [negativeScore, setNegativeScore] = useState(0);
  const [positivePost, setPositivePost] = useState(0);
  const [negativePost, setNegativePost] = useState(0);
  const [positiveScore, setPositiveScore] = useState(0);
  const [countNeural, setCountNeural] = useState(0);

  useEffect(() => {
    if (scoreSearchTweet.length > 0) {
      const [countNegative, sumNegative] = sumNeg(scoreSearchTweet);
      setNegativeScore(-sumNegative);
      setNegativePost(countNegative);
      const [countPositive, sumPositive] = sumPos(scoreSearchTweet);
      setPositiveScore(sumPositive);
      setPositivePost(countPositive);
      const [neural] = sumNeural(scoreSearchTweet);
      setCountNeural(neural)
    }
    else if (summary100PostScore.positiveScore) {
      setPositiveScore(summary100PostScore.positiveScore);
      setNegativeScore(summary100PostScore.negativeScore);
    }

  }, [scoreSearchTweet, summary100PostScore]);

  useEffect(() => {
    if (true) {
      setAchirveScore({
        negativeScore: negativeScore,
        positiveScore: positiveScore,
      });
    }

  }, [scoreSearchTweet, negativeScore, positiveScore, setAchirveScore]);

  const data = [negativeScore, positiveScore, negativePost, positivePost, countNeural];
  return (
    <div>
      <Bar
        data={{
          labels: ["Negative Score", "Positive Score", "Negative Tweets", "Positive Tweets", "Neural Tweets"],
          datasets: [
            {
              label: "Interger Number",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgb(54, 162, 235, 0.2)",
              ],
              borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)", "	rgba(54, 162, 235, 1)"],
              borderWidth: 1,
            },
          ]
        }}
        options={options}
      />
    </div>
  );
};

export default TotalSearchChart;
