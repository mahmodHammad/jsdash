const sidebarcharts = document.getElementById("slide-out");
const layout = document.getElementById("layout");
const sidebarIds = Object.keys(initCharts);
function toggle(e) {
  const id = e.id.slice(0, -1);

  if (!initCharts[id].active) {
    const { x, y, w, h } = initCharts[id].layout;
    const temp = document.createElement("div");
    temp.innerHTML = `<div id=${id} class="grid-stack-item-content">  another widget!</div>`;

    grid.addWidget(temp, 0, 0, w, h, true);
    allcharts[id](id);
    initCharts[id].active = true;
    updateSidebar();
  } else {
    let el = document.getElementById(id);
    el.parentNode.remove();
    // grid.removeAll(true)
    initCharts[id].active = false;
    //   grid.destroy()
    console.log("remmmmmmmmove", el);
  }
  updateSidebar();
}

function renderSideBarCharts() {
  return sidebarIds.map(
    (c) => `<li id=${c}x class="sidebarItem ${
      initCharts[c].active ? "active" : ""
    }"  onclick="toggle(${c}x)">
		     <div class="card-body">
			    ${initCharts[c].label}
		     </div>
		  </li>`
  );
}

function updateSidebar() {
  sidebarcharts.innerHTML =
    renderSideBarCharts() + '<div id="trash"> Drop here to remove! </div>';
}
updateSidebar()
 
var grid = GridStack.init({
  alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ),
  resizable: {
    handles: "e, se, s, sw, w",
  },
  removable: "#trash",
  removeTimeout: 100,
  acceptWidgets: true,
  animate: true,
  cellHeight: 40,
  column: 12,
  removeTimeout: 10,
});

function renderinitcharts() {
  const active = sidebarIds.filter((e) => {
    return initCharts[e].active;
  });

  active.forEach((id) => {
    const { x, y, w, h } = initCharts[id].layout;
    const temp = document.createElement("div");
    temp.innerHTML = `<div id=${id} class="grid-stack-item-content">  ${id} widget!</div>`;

    grid.addWidget(temp, x, y, w, h, false);
    allcharts[id](id);
  });
}
renderinitcharts();
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
  console.log("e ", e);
});

// TODO: switch jquery-ui out
$(".newWidget").draggable({
  revert: "invalid",
  scroll: false,
  appendTo: "body",
  helper: "clone",
});
