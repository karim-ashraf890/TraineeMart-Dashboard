import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

const generateData = (count: number, min: number, max: number) => {
  const data: [number, number][] = [];
  let date = new Date("11 Feb 2017").getTime();
  for (let i = 0; i < count; i++) {
    data.push([date, Math.floor(Math.random() * (max - min + 1)) + min]);
    date += 86400000;
  }
  return data;
};

const series = [
  { name: "South", data: generateData(20, 10, 60) },
  { name: "North", data: generateData(20, 10, 20) },
  { name: "Central", data: generateData(20, 10, 15) },
];

const options: ApexOptions = {
  chart: {
    type: "area",
    height: 350,
    stacked: true,
    toolbar: { show: false },
  },
  colors: ["#008FFB", "#00E396", "#CED4DC"],
  dataLabels: { enabled: false },
  stroke: { curve: "monotoneCubic" },
  fill: {
    type: "gradient",
    gradient: { opacityFrom: 0.6, opacityTo: 0.8 },
  },
  legend: { position: "top", horizontalAlign: "left" },
  xaxis: { type: "datetime" },
};

export default function StackedAreaChart() {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={350}
    />
  );
}
