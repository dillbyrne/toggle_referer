self.port.on("show",function(state){
  //set the panel to show the currently selected referer
  document.getElementById("state"+state).checked = true;
});
