(function(){

if(self==top)
{
	if(console) console.log("SpotfluxGuard ON v23");
	//document.write('<scr" + "ipt src="http://cdn.spotflux.com/service/partners/"></script>');
	//document.write('<scr" + "ipt type="text/javascript" sss="http://cdn.spotflux.com/service/launcher/partner.js">');

	var fffd = document.write;
	//var fffst = window.setTimeout;
	//var fffsi = window.setInterval;
	var fffce = document.createElement;

	
function iflocal(stack){
	var rxdomain = /.*?:\/\/(.*?)\/.*/;
	var localdomain = rxdomain.exec(location.href)[1];
	var rx = new RegExp(localdomain);
	//var islocal = rx.test(stack);
	var isdeclaredscript = false;
	
	var ss = document.getElementsByTagName("script");
	for(var i = 0; i < ss.length; i++){
		var s = ss[i];
		var src = s.src;
		if(src){
			var scriptdomain = rxdomain.exec(src)[1];
			var rxscriptdomain = new RegExp(scriptdomain);
			if(rxscriptdomain.test(stack)){
				if(console) console.log("found on declared domain", scriptdomain);
				isdeclaredscript = true;
			}
		}
	}
	
	if(isdeclaredscript)
		if(console) console.log("iflocal allowed", /*islocal, */isdeclaredscript, stack);
	else
		if(console) console.warn("iflocal denied", /*islocal, */isdeclaredscript, stack);
		
	return /*islocal || */isdeclaredscript;
}
/*
document.write = function()
{
	var stack = (new Error().stack)
	if(!iflocal(stack))
	{
		if(console) console.warn("write denied", arguments, stack);
		return null
	}
	else
	{
		if(console) console.log("write allowed", arguments, stack);
		return fffd.apply(document, arguments);
	}
}

//window.setTimeout = function(){if(console) console.log("setTimeout", arguments);return fffst.apply(this, arguments);}
//window.setInterval = function(){if(console) console.log("setInterval", arguments);return fffsi.apply(this, arguments);}

/*
document.createElement = function(){
	var stack = (new Error().stack)
	
	if(!iflocal(stack))
	{
		if(console) console.warn("createElement denied", arguments, stack);
		return null
	}
	else
	{
		if(console) console.log("createElement allowed", arguments, stack);
		var a = fffce.apply(document, arguments);
		var element = a, bubbles = false;

		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
		var observer = new MutationObserver(function (mutations) {
		  mutations.forEach(attrModified);
		});
		
		observer.observe(element, { attributes: true, subtree: bubbles });

		function attrModified(mutation) {
			var name = mutation.attributeName;
			var newValue = mutation.target.getAttribute(name);
			var oldValue = mutation.oldValue;
			var target = mutation.target;
			
			var stack = (new Error().stack)
			var isdangerousattribute = /src|href/i.test(name);
			
			//if(/adnxs/i.test(newValue) && /src|href/i.test(name))
			
			if(isdangerousattribute && !iflocal(stack))
			{
				console.info("Element from invalid source, removing node", newValue, target);
				target.parentNode.removeChild(target);
				if(console) console.warn("mutation denied", name, newValue, oldValue, target, arguments, stack);
			}else
			{
				if(console) console.log("mutation allowed", name, newValue, oldValue, target, arguments, stack);
			}
		}

		return a;
	}
}
*/
}else{
	if (console) console.log("Ignoring SpotfluxGuard, will not work if not top frame");
}

})();