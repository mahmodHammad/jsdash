const sidebarcharts = document.getElementById("slide-out");

const layout = document.getElementById("layout")


const chartid = "cats"

layout.innerHTML='<div class="grid-stack-item" data-gs-x="4" data-gs-y="0" data-gs-width="4" data-gs-height="4" ><div id='+chartid+' class="grid-stack-item-content">  another widget!</div></div>'
donut(chartid)

function renderSideBarCharts() {
  return initCharts.map(
    (c) =>
      `<li id=${c.id}x class="newWidget grid-stack-item">
			<div class="card-body grid-stack-item-content">
			 
				${c.label}
			</div>
		  </li>`
  );
}

sidebarcharts.innerHTML = renderSideBarCharts() + sidebarcharts.innerHTML;

var grid = GridStack.init({
  alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ),
  resizable: {
    handles: "e, se, s, sw, w",
  },
  removable: "#trash",
  removeTimeout: 100,
  acceptWidgets: ".newWidget",
  
});

grid.on("added", function (e, items) {
	const droppedId = items[0].el.id
layout.innerHTML='<div class="grid-stack-item" data-gs-x="4" data-gs-y="0" data-gs-width="4" data-gs-height="4" ><div id="chartdiv" class="grid-stack-item-content">  another widget!</div></div>'
renderchart()
  console.log(e, items[0].el.id);
});
grid.on("removed", function (e, items) {
  console.log("removed ", items);
});
grid.on("change", function (e, items) {
  console.log("change ", items);
});






// TODO: switch jquery-ui out
$(".newWidget").draggable({
  revert: "invalid",
  scroll: false,
  appendTo: "body",
  helper: "clone",
});

function renderchart(){
	am4core.ready(function () {
		// Themes begin
		am4core.useTheme(am4themes_material);
		// Themes end
	  
		var iconPath =
		  "M421.976,136.204h-23.409l-0.012,0.008c-0.19-20.728-1.405-41.457-3.643-61.704l-1.476-13.352H5.159L3.682,74.507 C1.239,96.601,0,119.273,0,141.895c0,65.221,7.788,126.69,22.52,177.761c7.67,26.588,17.259,50.661,28.5,71.548  c11.793,21.915,25.534,40.556,40.839,55.406l4.364,4.234h206.148l4.364-4.234c15.306-14.85,29.046-33.491,40.839-55.406  c11.241-20.888,20.829-44.96,28.5-71.548c0.325-1.127,0.643-2.266,0.961-3.404h44.94c49.639,0,90.024-40.385,90.024-90.024  C512,176.588,471.615,136.204,421.976,136.204z M421.976,256.252h-32c3.061-19.239,5.329-39.333,6.766-60.048h25.234  c16.582,0,30.024,13.442,30.024,30.024C452,242.81,438.558,256.252,421.976,256.252z";
	  
		var chart = am4core.create("chartdiv", am4charts.SlicedChart);
		chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
		chart.paddingLeft = 150;
	  
		chart.data = [
		  {
			name: "B",
			value: 40,
			disabled: true,
		  },
		  {
			name: "A",
			value: 60,
		  },
		];
	  
		var series = chart.series.push(new am4charts.PictorialStackedSeries());
		series.dataFields.value = "value";
		series.dataFields.category = "name";
		series.alignLabels = true;
		// this makes only A label to be visible
		series.labels.template.propertyFields.disabled = "disabled";
		series.ticks.template.propertyFields.disabled = "disabled";
	  
		series.maskSprite.path = iconPath;
		series.ticks.template.locationX = 1;
		series.ticks.template.locationY = 0;
	  
		series.labelsContainer.width = 100;
	  
		chart.legend = new am4charts.Legend();
		chart.legend.position = "top";
		chart.legend.paddingRight = 160;
		chart.legend.paddingBottom = 40;
		let marker = chart.legend.markers.template.children.getIndex(0);
		chart.legend.markers.template.width = 40;
		chart.legend.markers.template.height = 40;
		marker.cornerRadius(20, 20, 20, 20);
	  }); // end am4core.ready()
	  
}


function donut (id="donut"){
	am4core.ready(function() {

		// Themes begin
		am4core.useTheme(am4themes_material);
		// Themes end
		
		// Create chart instance
		var chart = am4core.create(id, am4charts.PieChart);
		
		// Add data
		chart.data = [{
		  "country": "Lithuania",
		  "litres": 501.9
		}, {
		  "country": "Czech Republic",
		  "litres": 301.9
		}, {
		  "country": "Ireland",
		  "litres": 201.1
		}, {
		  "country": "Germany",
		  "litres": 165.8
		}, {
		  "country": "Australia",
		  "litres": 139.9
		}, {
		  "country": "Austria",
		  "litres": 128.3
		}, {
		  "country": "UK",
		  "litres": 99
		}, {
		  "country": "Belgium",
		  "litres": 60
		}, {
		  "country": "The Netherlands",
		  "litres": 50
		}];
		
		// Add and configure Series
		var pieSeries = chart.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = "litres";
		pieSeries.dataFields.category = "country";
		pieSeries.innerRadius = am4core.percent(50);
		pieSeries.ticks.template.disabled = true;
		pieSeries.labels.template.disabled = true;
		
		var rgm = new am4core.RadialGradientModifier();
		rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
		pieSeries.slices.template.fillModifier = rgm;
		pieSeries.slices.template.strokeModifier = rgm;
		pieSeries.slices.template.strokeOpacity = 0.4;
		pieSeries.slices.template.strokeWidth = 0;
		
		chart.legend = new am4charts.Legend();
		chart.legend.position = "right";
	});
}


function dataStoring(id="dataStoring"){
	am4core.ready(function() {

		// Themes begin
		am4core.useTheme(am4themes_material);
		am4core.useTheme(am4themes_material);
		// Themes end
		
		
		var chart = am4core.create(id, am4charts.XYChart);
		
		chart.data = [{
		 "country": "USA",
		 "visits": 2025
		}, {
		 "country": "China",
		 "visits": 1882
		}, {
		 "country": "Japan",
		 "visits": 1809
		}, {
		 "country": "Germany",
		 "visits": 1322
		}, {
		 "country": "UK",
		 "visits": 1122
		}, {
		 "country": "France",
		 "visits": 1114
		}, {
		 "country": "India",
		 "visits": 984
		}, {
		 "country": "Spain",
		 "visits": 711
		}, {
		 "country": "Netherlands",
		 "visits": 665
		}, {
		 "country": "Russia",
		 "visits": 580
		}, {
		 "country": "South Korea",
		 "visits": 443
		}, {
		 "country": "Canada",
		 "visits": 441
		}];
		
		chart.padding(40, 40, 40, 40);
		
		var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
		categoryAxis.renderer.grid.template.location = 0;
		categoryAxis.dataFields.category = "country";
		categoryAxis.renderer.minGridDistance = 60;
		categoryAxis.renderer.inversed = true;
		categoryAxis.renderer.grid.template.disabled = true;
		
		var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		valueAxis.min = 0;
		valueAxis.extraMax = 0.1;
		//valueAxis.rangeChangeEasing = am4core.ease.linear;
		//valueAxis.rangeChangeDuration = 1500;
		
		var series = chart.series.push(new am4charts.ColumnSeries());
		series.dataFields.categoryX = "country";
		series.dataFields.valueY = "visits";
		series.tooltipText = "{valueY.value}"
		series.columns.template.strokeOpacity = 0;
		series.columns.template.column.cornerRadiusTopRight = 10;
		series.columns.template.column.cornerRadiusTopLeft = 10;
		//series.interpolationDuration = 1500;
		//series.interpolationEasing = am4core.ease.linear;
		var labelBullet = series.bullets.push(new am4charts.LabelBullet());
		labelBullet.label.verticalCenter = "bottom";
		labelBullet.label.dy = -10;
		labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";
		
		chart.zoomOutButton.disabled = true;
		
		// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
		series.columns.template.adapter.add("fill", function (fill, target) {
		 return chart.colors.getIndex(target.dataItem.index);
		});
		
		setInterval(function () {
		 am4core.array.each(chart.data, function (item) {
		   item.visits += Math.round(Math.random() * 200 - 100);
		   item.visits = Math.abs(item.visits);
		 })
		 chart.invalidateRawData();
		}, 2000)
		
		categoryAxis.sortBySeries = series;
		
		}); // end am4core.ready()
}

function human(id="human"){
	am4core.ready(function() {

		// Themes begin
		am4core.useTheme(am4themes_material);
		am4core.useTheme(am4themes_material);
		// Themes end
		
		var iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"
		
		
		
		var chart = am4core.create(id, am4charts.SlicedChart);
		chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
		
		chart.data = [{
			"name": "The first",
			"value": 354
		}, {
			"name": "The second",
			"value": 245
		}, {
			"name": "The third",
			"value": 187
		}, {
			"name": "The fourth",
			"value": 123
		}, {
			"name": "The fifth",
			"value": 87
		}, {
			"name": "The sixth",
			"value": 45
		}, {
			"name": "The seventh",
			"value": 23
		}];
		
		var series = chart.series.push(new am4charts.PictorialStackedSeries());
		series.dataFields.value = "value";
		series.dataFields.category = "name";
		series.alignLabels = true;
		
		series.maskSprite.path = iconPath;
		series.ticks.template.locationX = 1;
		series.ticks.template.locationY = 0.5;
		
		series.labelsContainer.width = 200;
		
		chart.legend = new am4charts.Legend();
		chart.legend.position = "left";
		chart.legend.valign = "bottom";
		
		}); // end am4core.ready()
}

function ang(id){
	am4core.ready(function() {

		// Themes begin
		am4core.useTheme(am4themes_material);
		am4core.useTheme(am4themes_material);
		// Themes end
		
		// create chart
		var chart = am4core.create("chartdiv", am4charts.GaugeChart);
		chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
		
		chart.innerRadius = -25;
		
		var axis = chart.xAxes.push(new am4charts.ValueAxis());
		axis.min = 0;
		axis.max = 100;
		axis.strictMinMax = true;
		axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
		axis.renderer.grid.template.strokeOpacity = 0.3;
		
		var colorSet = new am4core.ColorSet();
		
		var range0 = axis.axisRanges.create();
		range0.value = 0;
		range0.endValue = 50;
		range0.axisFill.fillOpacity = 1;
		range0.axisFill.fill = colorSet.getIndex(0);
		range0.axisFill.zIndex = - 1;
		
		var range1 = axis.axisRanges.create();
		range1.value = 50;
		range1.endValue = 80;
		range1.axisFill.fillOpacity = 1;
		range1.axisFill.fill = colorSet.getIndex(2);
		range1.axisFill.zIndex = -1;
		
		var range2 = axis.axisRanges.create();
		range2.value = 80;
		range2.endValue = 100;
		range2.axisFill.fillOpacity = 1;
		range2.axisFill.fill = colorSet.getIndex(4);
		range2.axisFill.zIndex = -1;
		
		var hand = chart.hands.push(new am4charts.ClockHand());
		
		// using chart.setTimeout method as the timeout will be disposed together with a chart
		chart.setTimeout(randomValue, 2000);
		
		function randomValue() {
			hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
			chart.setTimeout(randomValue, 2000);
		}
		
		}); // end am4core.ready()
}

function semi(id){
	am4core.ready(function() {

		// Themes begin
		am4core.useTheme(am4themes_material);
		am4core.useTheme(am4themes_material);
		// Themes end
		
		var chart = am4core.create(id, am4charts.PieChart);
		chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
		
		chart.data = [
		  {
			country: "Lithuania",
			value: 401
		  },
		  {
			country: "Czech Republic",
			value: 300
		  },
		  {
			country: "Ireland",
			value: 200
		  },
		  {
			country: "Germany",
			value: 165
		  },
		  {
			country: "Australia",
			value: 139
		  },
		  {
			country: "Austria",
			value: 128
		  }
		];
		chart.radius = am4core.percent(70);
		chart.innerRadius = am4core.percent(40);
		chart.startAngle = 180;
		chart.endAngle = 360;  
		
		var series = chart.series.push(new am4charts.PieSeries());
		series.dataFields.value = "value";
		series.dataFields.category = "country";
		
		series.slices.template.cornerRadius = 10;
		series.slices.template.innerCornerRadius = 7;
		series.slices.template.draggable = true;
		series.slices.template.inert = true;
		series.alignLabels = false;
		
		series.hiddenState.properties.startAngle = 90;
		series.hiddenState.properties.endAngle = 90;
		
		chart.legend = new am4charts.Legend();
		
		}); // end am4core.ready()
}


function simplePieChart(id){
	am4core.ready(function() {

		// Themes begin
		am4core.useTheme(am4themes_material);
		am4core.useTheme(am4themes_material);
		// Themes end
		
		// Create chart instance
		var chart = am4core.create(id, am4charts.PieChart);
		
		// Add data
		chart.data = [ {
		  "country": "Lithuania",
		  "litres": 501.9
		}, {
		  "country": "Czechia",
		  "litres": 301.9
		}, {
		  "country": "Ireland",
		  "litres": 201.1
		}, {
		  "country": "Germany",
		  "litres": 165.8
		}, {
		  "country": "Australia",
		  "litres": 139.9
		}, {
		  "country": "Austria",
		  "litres": 128.3
		}, {
		  "country": "UK",
		  "litres": 99
		}, {
		  "country": "Belgium",
		  "litres": 60
		}, {
		  "country": "The Netherlands",
		  "litres": 50
		} ];
		
		// Add and configure Series
		var pieSeries = chart.series.push(new am4charts.PieSeries());
		pieSeries.dataFields.value = "litres";
		pieSeries.dataFields.category = "country";
		pieSeries.slices.template.stroke = am4core.color("#fff");
		pieSeries.slices.template.strokeWidth = 2;
		pieSeries.slices.template.strokeOpacity = 1;
		
		// This creates initial animation
		pieSeries.hiddenState.properties.opacity = 1;
		pieSeries.hiddenState.properties.endAngle = -90;
		pieSeries.hiddenState.properties.startAngle = -90;
		
		}); // end am4core.ready()
}
 