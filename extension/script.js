var fffd = document.write;
//var fffst = window.setTimeout;
//var fffsi = window.setInterval;
var fffce = document.createElement;
document.write = function(){console.log("write", arguments);return fffd.apply(document, arguments);}
//window.setTimeout = function(){console.log("setTimeout", arguments);return fffst.apply(this, arguments);}
//window.setInterval = function(){console.log("setInterval", arguments);return fffsi.apply(this, arguments);}
document.createElement = function(){var a = fffce.apply(document, arguments);
//console.log("createElement", a, arguments);
var element = a, bubbles = false;

var observer = new WebKitMutationObserver(function (mutations) {
  mutations.forEach(attrModified);
});
observer.observe(element, { attributes: true, subtree: bubbles });

function attrModified(mutation) {
  var name = mutation.attributeName,
    newValue = mutation.target.getAttribute(name),
    oldValue = mutation.oldValue;
	var target = mutation.target;

  console.log("mutation", name, newValue, oldValue, target, arguments);
}

return a;}