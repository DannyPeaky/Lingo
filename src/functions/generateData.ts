import generateEmptySet from "./generateEmptySet";

const generateData = () => {
  const labels = [4, 5, 6];
  const datasets = [1, 2, 3, 4, 5, "Incorrect"] as const;
  const colors = {
    1: { bar: "#69B34C" },
    2: { bar: "#ACB334" },
    3: { bar: "#FAB733" },
    4: { bar: "#FF8E15" },
    5: { bar: "#FF4E11" },
    Incorrect: { bar: "#FF0D0D" },
  } as const;
  const data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      datalabels: { color: string };
      minBarLength: number;
    }[];
  } = { labels: ["4 Letters", "5 Letters", "6 Letters"], datasets: [] };
  let stats;

  try {
    stats = JSON.parse(localStorage.getItem("stats")!);
    if (!stats) throw new Error("No stats.");
  } catch {
    stats = generateEmptySet();
  }

  for (const set of datasets) {
    const label = set === 1 ? " Guess" : set === "Incorrect" ? "" : " Guesses";
    const obj = {
      label: set + label,
      data: labels.map(l => stats[l][set] ?? stats[l].wrong),
      backgroundColor: colors[set].bar,
      datalabels: { color: "#fff" },
      minBarLength: 10,
    };

    data.datasets.push(obj);
  }

  return data;
};

export default generateData;
