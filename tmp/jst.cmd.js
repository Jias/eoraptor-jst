define(function (require, exports, module) {
var __ = require("eoraptor")._;

this["eoraptor"] = this["eoraptor"] || {};

var ns=this["eoraptor"], e_=__.e, v_=__.v;


ns["a-b"] = function (data) {
var d_=data, r_=[];
if(d_.success){r_.push("success");
}else{r_.push("failure");
}
return r_.join("");
};

ns["a"] = function (data) {
var d_=data, r_=[];
r_.push("<ul>");
var key, item;
for(key in d_.list){
if(!d_.list.hasOwnProperty(key)) return;
item = d_.list[key];
r_.push("<li>");
r_.push(e_(v_(item.name, d_)));
r_.push("</li>");
}
r_.push("</ul>");
return r_.join("");
};

ns["b"] = function (data) {
var d_=data, r_=[];
if(d_.success){r_.push("success");
}else{r_.push("failure");
}
return r_.join("");
};

module.exports = this["eoraptor"];

});