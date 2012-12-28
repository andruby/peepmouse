window.onload = function(){
  (function(){
    var sender = function(f){
      var input     = document.getElementById('input');
      input.onclick = function(){ input.value = "" };
      f.onsubmit    = function(){
        ws.send(input.value);
        input.value = "send a message";
        return false;
      }
    }(document.getElementById('form'));
  })();
}

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
  
  $(document).mousemove(function(e){
    ws.send(JSON.stringify({left: e.pageX, top: e.pageY}));
  }); 
})