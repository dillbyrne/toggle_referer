var Panel = require("sdk/panel"),
    Data = require("./Data"),
    PrefServ = require("./PrefServ"),
    panel;


exports.init = function(){
  
    panel = Panel.Panel({
        width:350,
        height:150,
        contentURL: Data.get("html/options-panel.html"),
        contentScriptFile: [
            Data.get("js/get-options.js"),
            Data.get("js/optionspage.js")]
    });


	panel.on("show",function(){
	  	//send the referrer state to the panel
		panel.port.emit("show",PrefServ.getter("network.http.sendRefererHeader"));
	  
	});


	panel.port.on("chosen-options",function(state){
		// set referer
	  	PrefServ.setter("network.http.sendRefererHeader",state)
	});


};

exports.get = function(){
	return panel;
};