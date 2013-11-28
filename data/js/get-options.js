self.port.on("hide", function(){
   
  //get relevant elements
  state0 = document.getElementById('state0');
  state1 = document.getElementById('state1');

  // send the selected option to main.js 
  if (state0.checked)
    self.port.emit("chosen-options", 0);
  else if (state1.checked)
    self.port.emit("chosen-options", 1);
  else
    self.port.emit("chosen-options", 2);
});    


self.port.on("show",function(state){
  //set the panel to show the currently selected referer
  if (state == 0){
    radiobtn = document.getElementById("state0");
    radiobtn.checked = true;
  }
  else if (state == 1){
    radiobtn = document.getElementById("state1");
    radiobtn.checked = true;
  }
  else{
    radiobtn = document.getElementById("state2");
    radiobtn.checked = true;
  }

    
});
