var cm = require("sdk/context-menu");
    PrefServ = require("./PrefServ"),
    Data = require("./Data"),

refMenu = cm.Menu({
    label: "Toggle Referer",
    image: Data.get("images/state216.png"),
    contentScript: 'self.on("click", function (node, data) {' +
                 '    self.postMessage(data);' +
                 '});',
    items: [
	cm.Item({ image: Data.get("images/state016.png"), label: "Never send Referer header", data: "0" }),
	cm.Item({ image: Data.get("images/state116.png"), label: "Send Referer header on link click", data: "1" }),
	cm.Item({ image: Data.get("images/state216.png"), label: "Send Referer header on link or image click", data: "2" })
      ],
    onMessage:function (data){
        PrefServ.setter("network.http.sendRefererHeader",parseInt(data));
    }
});

exports.setImage = function(state){
    refMenu.image = Data.get("images/state"+state+"16.png");  
};