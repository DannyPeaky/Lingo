import React, {useState} from "react";
import {IoCloseOutline} from "react-icons/io5";

import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Bar} from "react-chartjs-2";
import generateData from "../functions/generateData";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);
ChartJS.defaults.set("plugins.datalabels", {
  font: {
    weight: "bold",
  },
});

const useStatistics = () => {
  const [show, setShow] = useState(false);

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const scales = {ticks: {color: "#fff"}, grid: {color: "#55555555", borderColor: "#fff"}};

  const options = {
    aspectRatio: vw / vh,
    responsive: true,
    plugins: {
      legend: {position: vw > 700 ? "right" : "bottom", labels: {color: "#fff"}},
      title: {display: false},
      datalabels: {anchor: "end", align: "start", clip: true},
    },
    scales: {x: scales, y: {...scales, beginAtZero: true, suggestedMax: 5, ticks: {stepSize: 1}}},
  };

  const onClose = () => setShow(false);

  const Statistics = () => {
    return (
      <div className="leaderboard" style={{display: !show ? "none" : undefined}}>
        <div className="modal">
          <div className="close" onClick={onClose} onTouchEnd={onClose}>
            <IoCloseOutline />
          </div>

          <div className="title">Statistics</div>

          <div className="graph">{show && <Bar options={options} data={generateData()} />}</div>
        </div>
      </div>
    );
  };

  return [setShow, Statistics];
};

export default useStatistics;
