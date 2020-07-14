const sidebarcharts = document.getElementById("slide-out");
const layout = document.getElementById("layout");
const sidebarIds = Object.keys(initCharts);

// layout.addEventListener("drop", (e) => {
//   console.log("XXXXXXXXXXXXXXXXXx", e);
// });
function displaycharts() {
  const active = sidebarIds.filter((e) => {
    return initCharts[e].active;
  });

  active.forEach((id) => {
    const { x, y, w, h } = initCharts[id].layout;
    layout.innerHTML += `<div class="grid-stack-item" data-gs-x=${x} data-gs-y=${y} data-gs-width=${w} data-gs-height=${h} ><div id=${id} class="grid-stack-item-content">  another widget!</div></div>`;
  });
}
displaycharts();

function toggle(e) {
  const id = e.id.slice(0, -1);

  console.log(initCharts[id].layout);
  const { x, y, w, h } = initCharts[id].layout;
  const temp = document.createElement("div");
  temp.innerHTML = `<div class="grid-stack-item" data-gs-x=${x} data-gs-y=${y} data-gs-width=${w} data-gs-height=${h} ><div id=${id} class="grid-stack-item-content">  another widget!</div></div>`;

  grid.addWidget(temp, x, y, w, h, true);
  allcharts[id](id);
}

function renderSideBarCharts() {
  return sidebarIds.map(
    (c) => `<li id=${c}x class=""  onclick="toggle(${c}x)">
		     <div class="card-body">
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

// grid.on("added", function (e, items) {
//   console.log(e.target);
//   const SideId = items[0].el.id;
//   const id = SideId.slice(0, -1);

//   //   initCharts[droppedId].active=true
//   //   displaycharts()
//   //   console.log("droppedId",droppedId)
//   const { x, y, w, h } = initCharts[id].layout;
//   e.target.innerHTML +=`<div draggable="true" class="grid-stack-item" data-gs-x=${x} data-gs-y=${y} data-gs-width=${w} data-gs-height=${h} ><div id=${id} class="grid-stack-item-content">  another widget!</div></div>`;

//   allcharts[id](id);

//   console.log(e, items);
// });
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
