function store() {
  console.log("Store", initCharts);
  localStorage.setItem("layout", JSON.stringify(initCharts));
}

function restore() {
  const sLayout = localStorage.getItem("layout");
  if (sLayout == null) {
    localStorage.setItem("layout", JSON.stringify(initCharts));
  } else {
    initCharts = JSON.parse(sLayout);
  }
}
restore();
const sidebarcharts = document.getElementById("slide-out");
const layout = document.getElementById("layout");
const sidebarIds = Object.keys(initCharts);

function toggle(e) {
  const id = e.id.slice(0, -1);

  if (!initCharts[id].active) {
    const { x, y, w, h } = initCharts[id].layout;
    const temp = document.createElement("div");
    temp.innerHTML = `<div id=${id} class="grid-stack-item-content">  another widget!</div>`;

    grid.addWidget(temp, 0, 0, w, h, true, 2, undefined, 2, undefined, id);
    allcharts[id](id);
    initCharts[id].active = true;
    updateSidebar();
  } else {
    let el = document.getElementById(id);
    el.parentNode.remove();
    // grid.removeAll(true)
    initCharts[id].active = false;
    //   grid.destroy()
  }
  updateSidebar();
  store();
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
updateSidebar();

var grid = GridStack.init({
  alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ),
  resizable: {
    handles: "e, se, s, sw, w",
  },
  removable: "#slide-out",
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

    grid.addWidget(temp, x, y, w, h, false, 2, undefined, 2, undefined, id);
    allcharts[id](id);
  });
}
renderinitcharts();

grid.on("removed", function (e, items) {
  const id = items[0].id;
  initCharts[id].active = false;
  store();
  updateSidebar();
});
grid.on("change", function (e, items) {
  const item = items[0];
  const id = item.id;
  const { x, y, width: w, height: h } = item;
  let layout = { x, y, w, h };
  initCharts[id].layout = layout;

  store();
});
// TODO: switch jquery-ui out
$(".newWidget").draggable({
  revert: "invalid",
  scroll: false,
  appendTo: "body",
  helper: "clone",
});
