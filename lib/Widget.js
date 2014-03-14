var widget = require("sdk/widget"),
    Data = require("./Data"),
    Panel = require("./Panel"),
    PrefServ = require("./PrefServ"),
    widgetObj,
    tooltips = ["Referer 0: Never send the Referer header or set document.referrer",
				"Referer 1: Send the Referer header when clicking on a link, and set document.referrer for the following page",
				"Referer 2: Send the Referer header when clicking on a link or loading an image, and set document.referrer for the following page. (Default)"],
	icons = ["images/state0.png", "images/state1.png", "images/state2.png"];


exports.init = function(){
  
    widgetObj = widget.Widget({
        id: "toggle-referer",
        label:"Toggle Referer",
        panel: Panel.get(),
        contentURL: Data.get(icons[2]),
        contentScriptFile: Data.get("js/click-listener.js")
    });


    widgetObj.port.on("right-click",function(){
  	//toggle referrer state
  
  		if(PrefServ.getter("network.http.sendRefererHeader") == 0 )
    		PrefServ.setter("network.http.sendRefererHeader",1);
	  	else if(PrefServ.getter("network.http.sendRefererHeader") == 1)
  			PrefServ.setter("network.http.sendRefererHeader",2)
	  	else
    		PrefServ.setter("network.http.sendRefererHeader",0);
	});

	//set initial icon and url
	setupIconAndLabel(PrefServ.getter("network.http.sendRefererHeader"));
};



function setupIconAndLabel(state){
	widgetObj.tooltip = tooltips[state];
  	widgetObj.contentURL = Data.get(icons[state]);  

};

exports.setIconAndLabel = function(state){
	setupIconAndLabel(state);
};