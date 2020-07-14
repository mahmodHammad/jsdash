const sidebarcharts = document.getElementById("slide-out");
const layout = document.getElementById("layout");
const chartid = "cats";

function displaychart() {
  console.log(initCharts);
  const active = initCharts.filter((e) => {
    console.log(e);
    return e.active;
  });
  console.log(active);

  active.forEach((c) => {
	console.log(c, "c");
	const {x,y,w,h}=c.layout
    layout.innerHTML += `<div class="grid-stack-item" data-gs-x=${x} data-gs-y=${y} data-gs-width=${w} data-gs-height=${h} ><div id=${c.id} class="grid-stack-item-content">  another widget!</div></div>`;
    allcharts[c.id](c.id);
  });
}
displaychart();
// layout.innerHTML =
//   '<div class="grid-stack-item" data-gs-x="4" data-gs-y="0" data-gs-width="4" data-gs-height="4" ><div id=' +
//   chartid +
//   ' class="grid-stack-item-content">  another widget!</div></div>';
// donut(chartid);

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
  const droppedId = items[0].el.id;
  layout.innerHTML =
    '<div class="grid-stack-item" data-gs-x="4" data-gs-y="0" data-gs-width="4" data-gs-height="4" ><div id="chartdiv" class="grid-stack-item-content">  another widget!</div></div>';
  renderchart();
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
