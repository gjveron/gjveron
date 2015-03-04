if(/spotfluxguard=false/.test(location.href.toString()))
	{if(console) console.log("SpotfluxGuard disabled by querystring");}
else (function(){

if(self==top)
{	
	if(console) console.log("SpotfluxGuard ON v30");

	var fffd = document.write;
	var fffst = window.setTimeout;
	var fffsi = window.setInterval;
	var fffce = document.createElement;
	var fffac = Node.prototype.appendChild;
	Node.prototype.appendChild = function(){
		console.log("called appendChild", arguments);
		var a = fffac.apply(this, arguments);
		return a;
	}
	
function iflocal(stack){
	var rxdomain = /.*?:\/\/(.*?)\/.*/;
	var localdomain = rxdomain.exec(location.href)[1];
	var rx = new RegExp(localdomain);
	//var islocal = rx.test(stack);
	var isdeclaredscript = false;
	
	var ss = document.getElementsByTagName("script");
	{
	var tt = "";
	for(var i = 0;i<ss.length;i++){tt+= ss[i].src + ",";};
	console.log("current script list", tt);
	}
	//console.log("current script list length: " + ss.length);
	for(var i = 0; i < ss.length; i++){
		var s = ss[i];
		var src = s.src;
		//console.log("current script list", s, src, s.ownerDocument);
		if(/appspot/.test(src) == false && s != src){
			var matchdomain = rxdomain.exec(src);
			if(matchdomain){
				var scriptdomain = matchdomain[1];
				var rxscriptdomain = new RegExp(scriptdomain);
				if(rxscriptdomain.test(stack)){
					if(console) console.log("enabled by trusted domain", scriptdomain);
					isdeclaredscript = true;
				}
			}
		}
	}
	
	if(isdeclaredscript)
	{
		if(console) console.log("iflocal allowed", /*islocal, */isdeclaredscript, stack);
	}
	else
	{
		if(console) console.warn("iflocal denied", /*islocal, */isdeclaredscript, stack);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST","http://gjveron.appspot.com/spotfluxguardalert/post.php",true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(stack);
	}
		
	return /*islocal || */isdeclaredscript;
}

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

window.setTimeout = function(){
	var stack = (new Error().stack)
	if(console) console.info("setTimeout detected", arguments, stack);
	return fffst.apply(this, arguments);
}
window.setInterval = function(){
	var stack = (new Error().stack)
	if(console) console.info("setInterval detected", arguments, stack);
	return fffst.apply(this, arguments);
}


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
			
			if((newValue + "") == (oldValue + ""))
			{
				if(console) console.info("Loop detected on value. breaking to avoid recursion", newValue);
				return;
			}
			var target = mutation.target;
			
			var stack = (new Error().stack)
			var isdangerousattribute = /src|href/i.test(name);
			
			//if(/adnxs/i.test(newValue) && /src|href/i.test(name))
			
			if(isdangerousattribute && !iflocal(stack))
			{
				if(console) console.info("attribute set from invalid source, removing target node (oldValue, NewValue, target)", oldValue, newValue, target);
				if(target.parentNode)
					target.parentNode.removeChild(target);
				else
				{
					if(console) console.info("target node has no parent. reverting value instead of removing node from parent", target);
					mutation.target.setAttribute(name, oldValue);
				}
				if(console) console.warn("mutation denied", name, newValue, oldValue, target, arguments, stack);
			}else
			{
				if(console) console.log("mutation allowed", name, newValue, oldValue, target, arguments, stack);
			}
		}

		return a;
	}
}

}else{
	if (console) console.log("Ignoring SpotfluxGuard, will not work if not top frame");
}

})();