var ui = require("sdk/ui"),
    Data = require("./Data"),
    Panel = require("./Panel"),
    PrefServ = require("./PrefServ"),
    button,
    labels = ["Referer 0: Never send the Referer header or set document.referrer",
      "Referer 1: Send the Referer header when clicking on a link, and set document.referrer for the following page",
      "Referer 2: Send the Referer header when clicking on a link or loading an image, and set document.referrer for the following page. (Default)"],
    icons16 = ["images/state0.png", "images/state1.png", "images/state2.png"];


exports.init = function(){
  
    button = ui.ActionButton({
        id: "toggle-referer",
        label:"Toggle Referer",
        icon:
        {
	  "16":Data.get(icons16[2])
	},
	onClick: toggleState
    });

	//set initial icon and url
	setupIconAndLabel(PrefServ.getter("network.http.sendRefererHeader"));
};



function toggleState(){
    //toggle referrer state
    if(PrefServ.getter("network.http.sendRefererHeader") == 0 )
	PrefServ.setter("network.http.sendRefererHeader",1);
    else if(PrefServ.getter("network.http.sendRefererHeader") == 1)
	PrefServ.setter("network.http.sendRefererHeader",2)
    else
	PrefServ.setter("network.http.sendRefererHeader",0);
  
}

function setupIconAndLabel(state){
	button.label = tooltips[state];
  	button.icon["16"] = Data.get(icons16[state]);  

};

exports.setIconAndLabel = function(state){
	setupIconAndLabel(state);
};