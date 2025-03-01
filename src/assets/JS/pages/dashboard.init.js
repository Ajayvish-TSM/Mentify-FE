var options = {
    series: [
      { name: "2018", type: "line", data: [20, 34, 27, 59, 37, 26, 38, 25] },
      { name: "2019", data: [10, 24, 17, 49, 27, 16, 28, 15], type: "area" },
    ],
    chart: {
      height: 260,
      type: "line",
      toolbar: { show: !1 },
      zoom: { enabled: !1 },
    },
    colors: ["#45cb85", "#3b5de7"],
    dataLabels: { enabled: !1 },
    stroke: { curve: "smooth", width: "3", dashArray: [4, 0] },
    markers: { size: 3 },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      title: { text: "Month" },
    },
    fill: { type: "solid", opacity: [1, 0.1] },
    legend: { position: "top", horizontalAlign: "right" },
  },
  chart = new ApexCharts(document.querySelector("#line-chart"), options);
chart.render();
options = {
  series: [
    { name: "Series A", data: [11, 17, 15, 15, 21, 14] },
    { name: "Series B", data: [13, 23, 20, 8, 13, 27] },
    { name: "Series C", data: [44, 55, 41, 67, 22, 43] },
  ],
  chart: {
    type: "bar",
    height: 260,
    stacked: !0,
    toolbar: { show: !1 },
    zoom: { enabled: !0 },
  },
  plotOptions: {
    bar: { horizontal: !1, columnWidth: "20%", endingShape: "rounded" },
  },
  dataLabels: { enabled: !1 },
  xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
  colors: ["#eef3f7", "#ced6f9", "#3b5de7"],
  fill: { opacity: 1 },
};
(chart = new ApexCharts(
  document.querySelector("#column-chart"),
  options
)).render();
options = {
  series: [38, 26, 14],
  chart: { height: 245, type: "donut" },
  labels: ["Online", "Offline", "Marketing"],
  plotOptions: { pie: { donut: { size: "75%" } } },
  legend: { show: !1 },
  colors: ["#3b5de7", "#45cb85", "#eeb902"],
};
(chart = new ApexCharts(
  document.querySelector("#donut-chart"),
  options
)).render();
options = {
  series: [
    {
      name: "Series A",
      data: [
        [2, 5],
        [7, 2],
        [4, 3],
        [5, 2],
        [6, 1],
        [1, 3],
        [2, 7],
        [8, 0],
        [9, 8],
        [6, 0],
        [10, 1],
      ],
    },
    {
      name: "Series B",
      data: [
        [15, 13],
        [7, 11],
        [5, 8],
        [9, 17],
        [11, 4],
        [14, 12],
        [13, 14],
        [8, 9],
        [4, 13],
        [7, 7],
        [5, 8],
        [4, 3],
      ],
    },
  ],
  chart: {
    height: 225,
    type: "scatter",
    toolbar: { show: !1 },
    zoom: { enabled: !0, type: "xy" },
  },
  colors: ["#3b5de7", "#45cb85"],
  xaxis: { tickAmount: 10 },
  legend: { position: "top" },
  yaxis: { tickAmount: 7 },
};
(chart = new ApexCharts(
  document.querySelector("#scatter-chart"),
  options
)).render(),
  $("#usa-vectormap").vectorMap({
    map: "us_merc_en",
    backgroundColor: "transparent",
    regionStyle: { initial: { fill: "#556ee6" } },
    markerStyle: {
      initial: {
        r: 9,
        fill: "#556ee6",
        "fill-opacity": 0.9,
        stroke: "#fff",
        strokeWidth: 7,
        "stroke-opacity": 0.4,
      },
      hover: { stroke: "#fff", "fill-opacity": 1, strokeWidth: 1.5 },
    },
  });
