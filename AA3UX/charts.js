

function drawArea() {
var data = google.visualization.arrayToDataTable([
  ['Year', 'Sales', 'Expenses'],
  ['2013',  1000,      400],
  ['2014',  1170,      460],
  ['2015',  660,       1120],
  ['2016',  1030,      540]
]);

var options = {
  title: 'Company Performance',
  hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
  vAxis: {minValue: 0}
};

var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
chart.draw(data, options);
}

function drawBar() {
var data = google.visualization.arrayToDataTable([
["Element", "Density", { role: "style" } ],
["Copper", 8.94, "#b87333"],
["Silver", 10.49, "silver"],
["Gold", 19.30, "gold"],
["Platinum", 21.45, "color: #e5e4e2"]
]);

var view = new google.visualization.DataView(data);
view.setColumns([0, 1,
               { calc: "stringify",
                 sourceColumn: 1,
                 type: "string",
                 role: "annotation" },
               2]);

var options = {
title: "Density of Precious Metals, in g/cm^3",
width: 600,
height: 400,
bar: {groupWidth: "95%"},
legend: { position: "none" },
};
var chart = new google.visualization.BarChart(document.getElementById("barchart_values"));
chart.draw(view, options);
}

google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawPie);
google.charts.setOnLoadCallback(drawArea);

google.charts.setOnLoadCallback(drawBar);