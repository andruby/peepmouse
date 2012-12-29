jQuery(document).ready(function(){
  var show = function(el){
    return function(msg){ el.innerHTML = msg + '<br />' + el.innerHTML; }
  }(document.getElementById('msgs'));

  var ws       = new WebSocket('ws://' + window.location.host + window.location.pathname);
  ws.onopen    = function()  { show('websocket opened'); };
  ws.onclose   = function()  { show('websocket closed'); }
  ws.onmessage = function(m) {
    coordinates = JSON.parse(m.data);
    $('.pointer').css('left', coordinates['left']).css('top', coordinates['top'])
  };

  // in ms aka 30 times per second
  // a value between 24-30fps look smooth to the eye (33-41ms)
  // reduces bandwidth and server load
  var min_interval = 40;
  var lastMouseSend = Date.now();

  $(document).mousemove(function(e){
    if ((Date.now() - lastMouseSend) > min_interval) {
      ws.send(JSON.stringify({left: e.pageX, top: e.pageY}));
      lastMouseSend = Date.now()
    }
  });
})
