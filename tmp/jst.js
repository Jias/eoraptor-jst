(function(){

this["eoraptor"] = this["eoraptor"] || {};

var ns=this["eoraptor"], e__ = eoraptor.escape;

ns["a"] = function (data) {
var t__=data, r__=[];
r__.push("<ul>");
var key, item;
for(key in t__.features){
if(!t__.features.hasOwnProperty(key)) return;
item = t__.features[key];
r__.push("<li>");
r__.push(key);
r__.push(":");
r__.push(item);
r__.push("</li>");
}
r__.push("</ul>");
return r__.join("");
};

ns["b"] = function (data) {
var t__=data, r__=[];
r__.push("the number is ");
if(t__.number === 1){
r__.push("one");
}else{
r__.push("unknown");
}
return r__.join("");
};

})();