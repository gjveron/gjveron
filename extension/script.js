if(!alreadyexecuted){

var alreadyexecuted = true;

var fffd = document.write;
//var fffst = window.setTimeout;
//var fffsi = window.setInterval;
var fffce = document.createElement;
document.write = function(){console.log("write", arguments);return fffd.apply(document, arguments);}
//window.setTimeout = function(){console.log("setTimeout", arguments);return fffst.apply(this, arguments);}
//window.setInterval = function(){console.log("setInterval", arguments);return fffsi.apply(this, arguments);}
document.createElement = function(){var a = fffce.apply(document, arguments);
console.log("createElement", a, (new Error().stack));
var element = a, bubbles = false;

var observer = new WebKitMutationObserver(function (mutations) {
  mutations.forEach(attrModified);
});
observer.observe(element, { attributes: true, subtree: bubbles });

function attrModified(mutation) {
	var name = mutation.attributeName;
	var newValue = mutation.target.getAttribute(name);
	var oldValue = mutation.oldValue;
	var target = mutation.target;
	if(/adnxs/i.test(newValue) && /src|href/i.test(name)){
		console.info("remove blacklisted ad", newValue);
		target.parentNode.removeChild(target);
	}
	console.log("mutation", name, newValue, oldValue, target, arguments);
}

return a;}

}