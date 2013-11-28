var widgets = require("sdk/widget");
var data = require("sdk/self").data;
var pref_serv = require("sdk/preferences/service");

var pref_ref_state = "network.http.sendRefererHeader";


var tooltips = new Array();
tooltips[0] = "Referer 0: Never send the Referer header or set document.referrer";
tooltips[1] = "Referer 1: Send the Referer header when clicking on a link, and set document.referrer for the following page";
tooltips[2] = "Referer 2: Send the Referer header when clicking on a link or loading an image, and set document.referrer for the following page. (Default)"

var icons = new Array();
icons[0] = "images/state0.png";
icons[1] = "images/state1.png";
icons[2] = "images/state2.png";



//monitor pref_ref_state for changes 
const {Ci, Cu} = require("chrome");
const {Services} = Cu.import("resource://gre/modules/Services.jsm", {});

function observe(subject, topic, data) {
  // instanceof actually also "casts" subject
  if (!(subject instanceof Ci.nsIPrefBranch)) {
    return;
  }
  //change the icon and label if there is a change
  setIconAndLabel(pref_serv.get(pref_ref_state));
}

var branch = Services.prefs.getBranch(pref_ref_state)
branch.addObserver("", observe, false);

exports.onUnload = function(reason) {
  // Need to remove our observer again! This isn't automatic and will leak
  // otherwise.
  branch.removeObserver("", observe);

  if(reason == "disable" || reason == "uninstall"){

    //restore preferences to defaults
    pref_serv.reset(pref_ref_state);
  }

};




var options_panel = require("sdk/panel").Panel({
  width: 350,
  height: 150,
  contentURL: data.url("html/options-panel.html"),
  contentScriptFile: data.url("js/get-options.js")
});

var widget = widgets.Widget({
  id: "toggle-referer",
  label:"Toggle Referrer",
  panel: options_panel,
  contentURL: data.url(icons[2]),
  contentScriptFile:data.url("js/click-listener.js")
});


//set initial icon and url
setIconAndLabel(pref_serv.get(pref_ref_state));


options_panel.on("hide",function(){
  options_panel.port.emit("hide");
});

options_panel.on("show",function(){
  //send the referrer state to the panel
  options_panel.port.emit("show",pref_serv.get(pref_ref_state));
  
});


options_panel.port.on("chosen-options",function(state){
  //set the referer to the chosen state
  setRefState(state);
});

widget.port.on("right-click",function(){
  //toggle referrer state
  
  if(pref_serv.get(pref_ref_state) == 0 )
    setRefState(1);
  else if(pref_serv.get(pref_ref_state) == 1)
    setRefState(2);
  else
    setRefState(0);
});



function setRefState(state){
    
  // set referer, tooltip and icon accordingly
  pref_serv.set(pref_ref_state,state);
  //console.log("state: "+state);
}

function setIconAndLabel(state){

  widget.tooltip = tooltips[state];
  widget.contentURL = data.url(icons[state]);  

}
