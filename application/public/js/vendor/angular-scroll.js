var duScrollDefaultEasing=function(e){"use strict";return.5>e?Math.pow(2*e,2)/2:1-Math.pow(2*(1-e),2)/2};angular.module("duScroll",["duScroll.scrollspy","duScroll.smoothScroll","duScroll.scrollContainer","duScroll.spyContext","duScroll.scrollHelpers"]).value("duScrollDuration",350).value("duScrollSpyWait",100).value("duScrollGreedy",!1).value("duScrollOffset",0).value("duScrollEasing",duScrollDefaultEasing).value("duScrollCancelOnEvents","scroll mousedown mousewheel touchmove keydown").value("duScrollBottomSpy",!1).value("duScrollActiveClass","active"),angular.module("duScroll.scrollHelpers",["duScroll.requestAnimation"]).run(["$window","$q","cancelAnimation","requestAnimation","duScrollEasing","duScrollDuration","duScrollOffset","duScrollCancelOnEvents",function(e,t,n,r,o,l,u,i){"use strict";var c={},a=function(e){return"undefined"!=typeof HTMLDocument&&e instanceof HTMLDocument||e.nodeType&&e.nodeType===e.DOCUMENT_NODE},s=function(e){return"undefined"!=typeof HTMLElement&&e instanceof HTMLElement||e.nodeType&&e.nodeType===e.ELEMENT_NODE},d=function(e){return s(e)||a(e)?e:e[0]};c.duScrollTo=function(t,n,r,o){var l;if(angular.isElement(t)?l=this.duScrollToElement:angular.isDefined(r)&&(l=this.duScrollToAnimated),l)return l.apply(this,arguments);var u=d(this);return a(u)?e.scrollTo(t,n):(u.scrollLeft=t,void(u.scrollTop=n))};var f,p;c.duScrollToAnimated=function(e,l,u,c){u&&!c&&(c=o);var a=this.duScrollLeft(),s=this.duScrollTop(),d=Math.round(e-a),m=Math.round(l-s),S=null,g=0,h=this,v=function(e){(!e||g&&e.which>0)&&(i&&h.unbind(i,v),n(f),p.reject(),f=null)};if(f&&v(),p=t.defer(),0===u||!d&&!m)return 0===u&&h.duScrollTo(e,l),p.resolve(),p.promise;var y=function(e){null===S&&(S=e),g=e-S;var t=g>=u?1:c(g/u);h.scrollTo(a+Math.ceil(d*t),s+Math.ceil(m*t)),1>t?f=r(y):(i&&h.unbind(i,v),f=null,p.resolve())};return h.duScrollTo(a,s),i&&h.bind(i,v),f=r(y),p.promise},c.duScrollToElement=function(e,t,n,r){var o=d(this);(!angular.isNumber(t)||isNaN(t))&&(t=u);var l=this.duScrollTop()+d(e).getBoundingClientRect().top-t;return s(o)&&(l-=o.getBoundingClientRect().top),this.duScrollTo(0,l,n,r)},c.duScrollLeft=function(t,n,r){if(angular.isNumber(t))return this.duScrollTo(t,this.duScrollTop(),n,r);var o=d(this);return a(o)?e.scrollX||document.documentElement.scrollLeft||document.body.scrollLeft:o.scrollLeft},c.duScrollTop=function(t,n,r){if(angular.isNumber(t))return this.duScrollTo(this.duScrollLeft(),t,n,r);var o=d(this);return a(o)?e.scrollY||document.documentElement.scrollTop||document.body.scrollTop:o.scrollTop},c.duScrollToElementAnimated=function(e,t,n,r){return this.duScrollToElement(e,t,n||l,r)},c.duScrollTopAnimated=function(e,t,n){return this.duScrollTop(e,t||l,n)},c.duScrollLeftAnimated=function(e,t,n){return this.duScrollLeft(e,t||l,n)},angular.forEach(c,function(e,t){angular.element.prototype[t]=e;var n=t.replace(/^duScroll/,"scroll");angular.isUndefined(angular.element.prototype[n])&&(angular.element.prototype[n]=e)})}]),angular.module("duScroll.polyfill",[]).factory("polyfill",["$window",function(e){"use strict";var t=["webkit","moz","o","ms"];return function(n,r){if(e[n])return e[n];for(var o,l=n.substr(0,1).toUpperCase()+n.substr(1),u=0;u<t.length;u++)if(o=t[u]+l,e[o])return e[o];return r}}]),angular.module("duScroll.requestAnimation",["duScroll.polyfill"]).factory("requestAnimation",["polyfill","$timeout",function(e,t){"use strict";var n=0,r=function(e,r){var o=(new Date).getTime(),l=Math.max(0,16-(o-n)),u=t(function(){e(o+l)},l);return n=o+l,u};return e("requestAnimationFrame",r)}]).factory("cancelAnimation",["polyfill","$timeout",function(e,t){"use strict";var n=function(e){t.cancel(e)};return e("cancelAnimationFrame",n)}]),angular.module("duScroll.spyAPI",["duScroll.scrollContainerAPI"]).factory("spyAPI",["$rootScope","$timeout","$window","$document","scrollContainerAPI","duScrollGreedy","duScrollSpyWait","duScrollBottomSpy","duScrollActiveClass",function(e,t,n,r,o,l,u,i,c){"use strict";var a=function(o){var a=!1,s=!1,d=function(){s=!1;var t,u=o.container,a=u[0],d=0;"undefined"!=typeof HTMLElement&&a instanceof HTMLElement||a.nodeType&&a.nodeType===a.ELEMENT_NODE?(d=a.getBoundingClientRect().top,t=Math.round(a.scrollTop+a.clientHeight)>=a.scrollHeight):t=Math.round(n.pageYOffset+n.innerHeight)>=r[0].body.scrollHeight;var f,p,m,S,g,h,v=i&&t?"bottom":"top";for(S=o.spies,p=o.currentlyActive,m=void 0,f=0;f<S.length;f++)g=S[f],h=g.getTargetPosition(),h&&(i&&t||h.top+g.offset-d<20&&(l||-1*h.top+d)<h.height)&&(!m||m[v]<h[v])&&(m={spy:g},m[v]=h[v]);m&&(m=m.spy),p===m||l&&!m||(p&&(p.$element.removeClass(c),e.$broadcast("duScrollspy:becameInactive",p.$element,angular.element(p.getTargetElement()))),m&&(m.$element.addClass(c),e.$broadcast("duScrollspy:becameActive",m.$element,angular.element(m.getTargetElement()))),o.currentlyActive=m)};return u?function(){a?s=!0:(d(),a=t(function(){a=!1,s&&d()},u,!1))}:d},s={},d=function(e){var t=e.$id,n={spies:[]};return n.handler=a(n),s[t]=n,e.$on("$destroy",function(){f(e)}),t},f=function(e){var t=e.$id,n=s[t],r=n.container;r&&r.off("scroll",n.handler),delete s[t]},p=d(e),m=function(e){return s[e.$id]?s[e.$id]:e.$parent?m(e.$parent):s[p]},S=function(e){var t,n,r=e.$scope;if(r)return m(r);for(n in s)if(t=s[n],-1!==t.spies.indexOf(e))return t},g=function(e){for(;e.parentNode;)if(e=e.parentNode,e===document)return!0;return!1},h=function(e){var t=S(e);t&&(t.spies.push(e),t.container&&g(t.container)||(t.container&&t.container.off("scroll",t.handler),t.container=o.getContainer(e.$scope),t.container.on("scroll",t.handler).triggerHandler("scroll")))},v=function(e){var t=S(e);e===t.currentlyActive&&(t.currentlyActive=null);var n=t.spies.indexOf(e);-1!==n&&t.spies.splice(n,1),e.$element=null};return{addSpy:h,removeSpy:v,createContext:d,destroyContext:f,getContextForScope:m}}]),angular.module("duScroll.scrollContainerAPI",[]).factory("scrollContainerAPI",["$document",function(e){"use strict";var t={},n=function(e,n){var r=e.$id;return t[r]=n,r},r=function(e){return t[e.$id]?e.$id:e.$parent?r(e.$parent):void 0},o=function(n){var o=r(n);return o?t[o]:e},l=function(e){var n=r(e);n&&delete t[n]};return{getContainerId:r,getContainer:o,setContainer:n,removeContainer:l}}]),angular.module("duScroll.smoothScroll",["duScroll.scrollHelpers","duScroll.scrollContainerAPI"]).directive("duSmoothScroll",["duScrollDuration","duScrollOffset","scrollContainerAPI",function(e,t,n){"use strict";return{link:function(r,o,l){o.on("click",function(o){if(l.href&&-1!==l.href.indexOf("#")||""!==l.duSmoothScroll){var u=l.href?l.href.replace(/.*(?=#[^\s]+$)/,"").substring(1):l.duSmoothScroll,i=document.getElementById(u)||document.getElementsByName(u)[0];if(i&&i.getBoundingClientRect){o.stopPropagation&&o.stopPropagation(),o.preventDefault&&o.preventDefault();var c=l.offset?parseInt(l.offset,10):t,a=l.duration?parseInt(l.duration,10):e,s=n.getContainer(r);s.duScrollToElement(angular.element(i),isNaN(c)?0:c,isNaN(a)?0:a)}}})}}}]),angular.module("duScroll.spyContext",["duScroll.spyAPI"]).directive("duSpyContext",["spyAPI",function(e){"use strict";return{restrict:"A",scope:!0,compile:function(t,n,r){return{pre:function(t,n,r,o){e.createContext(t)}}}}}]),angular.module("duScroll.scrollContainer",["duScroll.scrollContainerAPI"]).directive("duScrollContainer",["scrollContainerAPI",function(e){"use strict";return{restrict:"A",scope:!0,compile:function(t,n,r){return{pre:function(t,n,r,o){r.$observe("duScrollContainer",function(r){angular.isString(r)&&(r=document.getElementById(r)),r=angular.isElement(r)?angular.element(r):n,e.setContainer(t,r),t.$on("$destroy",function(){e.removeContainer(t)})})}}}}}]),angular.module("duScroll.scrollspy",["duScroll.spyAPI"]).directive("duScrollspy",["spyAPI","duScrollOffset","$timeout","$rootScope",function(e,t,n,r){"use strict";var o=function(e,t,n,r){angular.isElement(e)?this.target=e:angular.isString(e)&&(this.targetId=e),this.$scope=t,this.$element=n,this.offset=r};return o.prototype.getTargetElement=function(){return!this.target&&this.targetId&&(this.target=document.getElementById(this.targetId)||document.getElementsByName(this.targetId)[0]),this.target},o.prototype.getTargetPosition=function(){var e=this.getTargetElement();return e?e.getBoundingClientRect():void 0},o.prototype.flushTargetCache=function(){this.targetId&&(this.target=void 0)},{link:function(l,u,i){var c,a=i.ngHref||i.href;if(a&&-1!==a.indexOf("#")?c=a.replace(/.*(?=#[^\s]+$)/,"").substring(1):i.duScrollspy?c=i.duScrollspy:i.duSmoothScroll&&(c=i.duSmoothScroll),c){var s=n(function(){var n=new o(c,l,u,-(i.offset?parseInt(i.offset,10):t));e.addSpy(n),l.$on("$locationChangeSuccess",n.flushTargetCache.bind(n));var a=r.$on("$stateChangeSuccess",n.flushTargetCache.bind(n));l.$on("$destroy",function(){e.removeSpy(n),a()})},0,!1);l.$on("$destroy",function(){n.cancel(s)})}}}}]);
//# sourceMappingURL=angular-scroll.min.js.map