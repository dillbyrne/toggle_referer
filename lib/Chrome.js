//monitor pref_ref_state for changes 
const {Ci, Cu} = require("chrome");
const {Services} = Cu.import("resource://gre/modules/Services.jsm", {});

var PrefServ = require("./PrefServ"),
Widget = require("./Widget"),
branch = Services.prefs.getBranch("network.http.sendRefererHeader");

branch.addObserver("", observe, false);


function observe(subject, topic, data) {
    // instanceof actually also "casts" subject
    if (!(subject instanceof Ci.nsIPrefBranch)) {
        return;
    }
    
    //change the icon and label if there is a change
    Widget.setIconAndLabel(PrefServ.getter("network.http.sendRefererHeader"));
}

exports.onUnload = function(reason) {
    // Need to remove our observer again! This isn't automatic and will leak
    // otherwise.
    branch.removeObserver("", observe);

    if(reason == "disable" || reason == "uninstall"){
        //restore preferences to defaults
        PrefServ.resetter("network.http.sendRefererHeader");
    }

};