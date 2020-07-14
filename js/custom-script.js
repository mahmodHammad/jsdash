const sidebarcharts = document.getElementById("slide-out");
const layout = document.getElementById("layout");
const chartid = "cats";
const sidebarIds = Object.keys(initCharts);

function displaycharts() {
  console.log(initCharts);
  
  const active = sidebarIds.filter((e) => {
    return initCharts[e].active;
  });

  console.log(active);

  active.forEach(id => {
    const { x, y, w, h } = initCharts[id].layout;
    layout.innerHTML += `<div class="grid-stack-item" data-gs-x=${x} data-gs-y=${y} data-gs-width=${w} data-gs-height=${h} ><div id=${id} class="grid-stack-item-content">  another widget!</div></div>`;
    allcharts[id](id);
  });
}
displaycharts();

function renderSideBarCharts() {
	
  return sidebarIds.map(
    (c) =>
      `<li id=${c}x class="newWidget grid-stack-item">
			<div class="card-body grid-stack-item-content">
			 
				${initCharts[c].label}
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
