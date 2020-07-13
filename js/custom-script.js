var grid = GridStack.init({
	alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
	  navigator.userAgent
	),
	resizable: {
	  handles: 'e, se, s, sw, w'
	},
	removable: '#trash',
	removeTimeout: 100,
	acceptWidgets: '.newWidget'
  });

  grid.on('added', function(e, items) { console.log(e, items) });
  grid.on('removed', function(e, items) { console.log('removed ', items) });
  grid.on('change', function(e, items) { console.log('change ', items) });


  // TODO: switch jquery-ui out
  $('.newWidget').draggable({
	revert: 'invalid',
	scroll: false,
	appendTo: 'body',
	helper: 'clone'
  });