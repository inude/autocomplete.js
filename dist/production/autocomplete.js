!function(){"use strict";var t="undefined"==typeof window?global:window;if("function"!=typeof t.require){var e={},r={},n={},s={}.hasOwnProperty,i="components/",o=function(t,e){var r=0;e&&(0===e.indexOf(i)&&(r=i.length),e.indexOf("/",r)>0&&(e=e.substring(r,e.indexOf("/",r))));var s=n[t+"/index.js"]||n[e+"/deps/"+t+"/index.js"];return s?i+s.substring(0,s.length-".js".length):t},u=/^\.\.?(\/|$)/,a=function(t,e){for(var r,n=[],s=(u.test(e)?t+"/"+e:e).split("/"),i=0,o=s.length;o>i;i++)r=s[i],".."===r?n.pop():"."!==r&&""!==r&&n.push(r);return n.join("/")},l=function(t){return t.split("/").slice(0,-1).join("/")},p=function(e){return function(r){var n=a(l(e),r);return t.require(n,e)}},c=function(t,e){var n={id:t,exports:{}};return r[t]=n,e(n.exports,p(t),n),n.exports},d=function(t,n){var i=a(t,".");if(null==n&&(n="/"),i=o(t,n),s.call(r,i))return r[i].exports;if(s.call(e,i))return c(i,e[i]);var u=a(i,"./index");if(s.call(r,u))return r[u].exports;if(s.call(e,u))return c(u,e[u]);throw new Error('Cannot find module "'+t+'" from "'+n+'"')};d.alias=function(t,e){n[e]=t},d.register=d.define=function(t,r){if("object"==typeof t)for(var n in t)s.call(t,n)&&(e[n]=t[n]);else e[t]=r},d.list=function(){var t=[];for(var r in e)s.call(e,r)&&t.push(r);return t},d.brunch=!0,d._cache=r,t.require=d}}(),require.register("src/autocomplete",function(t,e,r){"use strict";var n;!function(t){t[t.AND=0]="AND",t[t.OR=1]="OR"}(n||(n={}));(function(){function t(e,r){if(void 0===e&&(e={}),void 0===r&&(r="[data-autocomplete]"),Array.isArray(r))r.forEach(function(r){new t(e,r)});else if("string"==typeof r){var n=document.querySelectorAll(r);Array.prototype.forEach.call(n,function(r){new t(e,r)})}else t.prototype.create(t.merge(t.defaults,e,{DOMResults:document.createElement("div")}),r)}return t.prototype.create=function(e,r){if(e.Input=r,e.Input.nodeName.match(/^INPUT$/i)&&e.Input.getAttribute("type").match(/^TEXT|SEARCH$/i)){e.Input.setAttribute("autocomplete","off"),e._Position(e),e.Input.parentNode.appendChild(e.DOMResults),e.$Listeners.focus=e._Focus.bind(e),e.$Listeners.keydown=t.prototype.event.bind(null,e),e.$Listeners.blur=e._Blur.bind(e),e.$Listeners.position=e._Position.bind(e),e.$Listeners.destroy=t.prototype.destroy.bind(null,e);for(var n in e.$Listeners)e.Input.addEventListener(n,e.$Listeners[n])}},t.prototype.event=function(e,r){for(var s in e.KeyboardMappings){var i=t.merge({Operator:n.AND},e.KeyboardMappings[s]),o=n.AND==i.Operator;i.Conditions.forEach(function(e){(o===!0&&i.Operator==n.AND||o===!1&&n.OR)&&(e=t.merge({Not:!1},e),e.hasOwnProperty("Is")?o=e.Is==r.keyCode?!e.Not:e.Not:e.hasOwnProperty("From")&&e.hasOwnProperty("To")&&(o=r.keyCode>=e.From&&r.keyCode<=e.To?!e.Not:e.Not))}),o===!0&&i.Callback.bind(e,r)()}},t.prototype.ajax=function(e,r,n){if(void 0===n&&(n=!0),e.$AjaxTimer&&window.clearTimeout(e.$AjaxTimer),n===!0)e.$AjaxTimer=window.setTimeout(t.prototype.ajax.bind(null,e,r,!1),e.Delay);else{e.Request&&e.Request.abort();var s=Object.getOwnPropertyNames(e.HttpHeaders),i=e._HttpMethod(),o=e._Url(),u=e.QueryArg+"="+e._Pre();i.match(/^GET$/i)&&(o+="?"+u),e.Request=new XMLHttpRequest,e.Request.open(i,o,!0);for(var a=s.length-1;a>=0;a--)e.Request.setRequestHeader(s[a],e.HttpHeaders[s[a]]);e.Request.onreadystatechange=r,e.Request.send(u)}},t.prototype.destroy=function(t){for(var e in t.$Listeners)t.Input.removeEventListener(e,t.$Listeners[e]);t.DOMResults.parentNode.removeChild(t.DOMResults)},t.merge=function(){for(var t,e={},r=0;r<arguments.length;r++)for(t in arguments[r])e[t]=arguments[r][t];return e},t.defaults={Delay:150,EmptyMessage:"No result here",HttpHeaders:{"Content-type":"application/x-www-form-urlencoded"},Limit:0,HttpMethod:"GET",QueryArg:"q",Url:null,KeyboardMappings:{Enter:{Conditions:[{Is:13,Not:!1}],Callback:function(t){if(-1!=this.DOMResults.getAttribute("class").indexOf("open")){var e=this.DOMResults.querySelector("li.active");null!==e&&(this._Select(e),this.DOMResults.setAttribute("class","autocomplete")),t.preventDefault()}},Operator:n.AND},KeyUpAndDown:{Conditions:[{Is:38,Not:!1},{Is:40,Not:!1}],Callback:function(t){var e=this.DOMResults.querySelector("li:first-child:not(.locked)"),r=this.DOMResults.querySelector("li.active");if(r){var n=Array.prototype.indexOf.call(r.parentNode.children,r),s=n+(t.keyCode-39),i=this.DOMResults.getElementsByTagName("li").length;0>s?s=i-1:s>=i&&(s=0),r.setAttribute("class",""),r.parentElement.childNodes.item(s).setAttribute("class","active")}else e&&e.setAttribute("class","active")},Operator:n.OR},AlphaNum:{Conditions:[{Is:13,Not:!0},{From:35,To:40,Not:!0}],Callback:function(e){var r=this.Input.getAttribute("data-autocomplete-old-value"),n=this._Pre();""!==n&&(r&&n==r||this.DOMResults.setAttribute("class","autocomplete open"),t.prototype.ajax(this,function(){4==this.Request.readyState&&200==this.Request.status&&(this._Render(this._Post(this.Request.response)),this._Open())}.bind(this)))},Operator:n.AND}},DOMResults:null,Request:null,Input:null,_EmptyMessage:function(){var t="";return t=this.Input.hasAttribute("data-autocomplete-empty-message")?this.Input.getAttribute("data-autocomplete-empty-message"):this.EmptyMessage,t===!1&&(t=""),t},_Limit:function(){var t=this.Input.getAttribute("data-autocomplete-limit");return isNaN(t)?this.Limit:parseInt(t)},_HttpMethod:function(){return this.Input.hasAttribute("data-autocomplete-method")?this.Input.getAttribute("data-autocomplete-method"):this.HttpMethod},_QueryArg:function(){return this.Input.hasAttribute("data-autocomplete-param-name")?this.Input.getAttribute("data-autocomplete-param-name"):this.QueryArg},_Url:function(){return this.Input.hasAttribute("data-autocomplete")?this.Input.getAttribute("data-autocomplete"):this.Url},_Blur:function(t){if(void 0===t&&(t=!1),t)this.DOMResults.setAttribute("class","autocomplete");else{var e=this;setTimeout(function(){e._Blur(!0)},150)}},_Focus:function(){var t=this.Input.getAttribute("data-autocomplete-old-value");t&&this.Input.value==t||this.DOMResults.setAttribute("class","autocomplete open")},_Open:function(){var t=this;Array.prototype.forEach.call(this.DOMResults.getElementsByTagName("li"),function(e){"locked"!=e.getAttribute("class")&&(e.onclick=function(r){t._Select(e)})})},_Position:function(){this.DOMResults.setAttribute("class","autocomplete"),this.DOMResults.setAttribute("style","top:"+(this.Input.offsetTop+this.Input.offsetHeight)+"px;left:"+this.Input.offsetLeft+"px;width:"+this.Input.clientWidth+"px;")},_Render:function(t){var e=document.createElement("ul"),r=document.createElement("li");if("string"==typeof t)if(t.length>0)this.DOMResults.innerHTML=t;else{var n=this._EmptyMessage();""!==n&&(r.innerHTML=n,r.setAttribute("class","locked"),e.appendChild(r))}else{this._Limit()<0&&(t=t.reverse());for(var s=0;s<t.length;s++)r.innerHTML=t[s].Label,r.setAttribute("data-autocomplete-value",t[s].Value),e.appendChild(r),r=document.createElement("li")}this.DOMResults.hasChildNodes()&&this.DOMResults.childNodes[0].remove(),this.DOMResults.appendChild(e)},_Post:function(t){try{var e=[],r=JSON.parse(t);if(0==Object.keys(r).length)return"";if(Array.isArray(r))for(var n=0;n<Object.keys(r).length;n++)e[e.length]={Value:r[n],Label:r[n]};else for(var s in r)e.push({Value:s,Label:r[s]});return e}catch(i){return t}},_Pre:function(){return this.Input.value},_Select:function(t){t.hasAttribute("data-autocomplete-value")?this.Input.value=t.getAttribute("data-autocomplete-value"):this.Input.value=t.innerHTML,this.Input.setAttribute("data-autocomplete-old-value",this.Input.value)},$AjaxTimer:null,$Listeners:{}},t})()});