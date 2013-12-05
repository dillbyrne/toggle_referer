document.body.addEventListener("change", function(e) {
    self.port.emit("chosen-options",parseInt(e.target.id.slice(5)));
},false);


