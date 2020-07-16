//|||||||||||||\\ THIS FILE NEEDS REFACTORING //|||||||||||||\\
//|||||||||||||\\ THIS FILE NEEDS REFACTORING //|||||||||||||\\
//|||||||||||||\\ THIS FILE NEEDS REFACTORING //|||||||||||||\\
const sidebarcharts = document.getElementById("slide-out");
const layout = document.getElementById("layout");
const sidebarIds = Object.keys(initCharts);

function store() {
  localStorage.setItem("layout", JSON.stringify(initCharts));
}

// override initcharts or store them
(function () {
  const sLayout = localStorage.getItem("layout");
  if (sLayout == null) {
    localStorage.setItem("layout", JSON.stringify(initCharts));
  } else {
    initCharts = JSON.parse(sLayout);
  }
})();

// reset the layout and display Empty
function checkEmpty(isAdd) {
  const active = getActive();
  if (active.length < 1) {
    if (isAdd) {
      layout.innerHTML = "";
    } else {
      layout.innerHTML = "<h3 class='empty' > Your Layout is Empty!  <h3/>";
      grid.removeAll(true);
    }
  } else return false;
}

function addToLayout(id) {
  const { w, h } = initCharts[id].layout;

  const temp = document.createElement("div");
  temp.innerHTML = `<div id=${id} class="grid-stack-item-content"> Your are not supposed to see this message :P </div>`;

  grid.addWidget(temp, 0, 0, w, h, true, 2, undefined, 2, undefined, id);
  allcharts[id](id); //render the chart
  initCharts[id].active = true;
}

function removeFromLayout(id) {
  let el = document.getElementById(id);
  el.parentNode.remove();
  initCharts[id].active = false;
}

function toggle(e) {
  const id = e.id.slice(0, -1); //remove the extra x at the end

  if (initCharts[id].active) {
    removeFromLayout(id);
    checkEmpty(false);
  } else {
    checkEmpty(true);
    addToLayout(id);
  }
  updateSidebar();
  store();
}

function updateSidebar() {
  // display the sidebar items
  function renderSideBarCharts() {
    // for simplicity i put this function here because i will not use it outside this scope
    return sidebarIds.map(
      (c) => `<li id=${c}x class="sidebarItem waves-effect  ${
        initCharts[c].active && "activeChart"
      }"  onclick="toggle(${c}x)">
		     <div class="card-body">
			    ${initCharts[c].label}
		     </div>
		  </li>`
    );
  }
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
  removeTimeout: 0,
  acceptWidgets: true,
  animate: true,
  cellHeight: 40,
  column: 12,
  removeTimeout: 0,
});

function getActive() {
  return sidebarIds.filter((e) => {
    return initCharts[e].active;
  });
}
// initialize the layout based on the state of the (initCharts) object
(function renderinitcharts() {
  checkEmpty(false);

  const active = getActive();
  active.forEach((id) => {
    const { x, y, w, h } = initCharts[id].layout;
    const temp = document.createElement("div");
    temp.innerHTML = `<div id=${id} class="grid-stack-item-content">  ${id} widget!</div>`;

    grid.addWidget(temp, x, y, w, h, false, 2, undefined, 2, undefined, id);
    allcharts[id](id);
  });
})();

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
