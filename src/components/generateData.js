const generateData = thisRound => {
  const labels = [4, 5, 6];
  const datasets = [1, 2, 3, 4, 5, "Incorrect"];
  const colors = {
    1: "#0f83ab",
    2: "#53c200",
    3: "#fd6868",
    4: "#53cfc9",
    5: "#d44d99",
    Incorrect: "#734fe9",
  };
  const data = {labels: ["4 Letters", "5 Letters", "6 Letters"], datasets: []};
  let stats;

  try {
    stats = thisRound || JSON.parse(localStorage.getItem("stats"));
    if (!stats) throw new Error("No stats.");
  } catch (e) {
    return data;
  }

  for (const set of datasets) {
    const label = set === 1 ? " Guess" : set === "Incorrect" ? "" : " Guesses";
    const obj = {
      label: set + label,
      data: labels.map(l => stats[l][set] ?? stats[l].wrong),
      backgroundColor: colors[set],
    };

    data.datasets.push(obj);
  }

  return data;
};

export default generateData;

// const generateData = thisRound => {
//   const labels = ["1 Guess", "2 Guesses", "3 Guesses", "4 Guesses", "5 Guesses", "Incorrect"];
//   const datasets = [4, 5, 6];
//   const colors = {
//     4: "#0f83ab",
//     5: "#faa43a",
//     6: "#fd6868",
//   };
//   const data = {labels, datasets: []};
//   let stats;

//   console.log(thisRound);

//   try {
//     if (!thisRound) {
//       stats = JSON.parse(localStorage.getItem("stats"));
//       console.log("All rounds");
//     } else {
//       console.log("Current Round");
//       stats = thisRound;
//     }
//   } catch (e) {
//     console.log(e);
//     return;
//   }

//   for (const set of datasets) {
//     const obj = {
//       label: `${set} Letters`,
//       data: labels.map((l, i) => stats[set][i + 1] ?? stats[set].wrong),
//       backgroundColor: colors[set],
//     };

//     data.datasets.push(obj);
//   }

//   return data;
// };

// export default generateData;
