/*! Paroller.js v1.4.7 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).paroller=t()}(this,function(){"use strict";var e=function(e){return"object"==typeof e&&null!==e&&e.constructor===Object&&"[object Object]"===Object.prototype.toString.call(e)},t=function(t,n){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,r)}return o},n=function(n){for(var o=1;o<arguments.length;o++){var r=null!=arguments[o]?arguments[o]:{};o%2?t(Object(r),!0).forEach(function(t){i(n,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach(function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(r,e))})}return n};function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};o(this,t),this.element=e,this.options=n,this.animate=this.animate.bind(this),this.animateElements=this.animateElements.bind(this),this.deferredUpdate=this.deferredUpdate.bind(this),this.update=this.update.bind(this),this.updateElement=this.updateElement.bind(this),this.element&&this.init()}var i,l;return i=t,(l=[{key:"init",value:function(){var t=this;this.options=n({factor:0,offset:0,type:"scroll",direction:"vertical"},this.options),this.refresh(),this.options.mobile||this.setStyle(),this.options.mobile||(this.update(),this.animate()),window.addEventListener("resize",function(){t.refresh(),t.options.mobile||t.setStyle(),t.options.mobile||t.update()})}},{key:"refresh",value:function(){this.options.mobile=/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),this.wHeight=window.innerHeight,this.wWidth=window.innerWidth,this.prevLoc=this.wHeight,this.ticking=!1,this.rect=this.element.getBoundingClientRect()}},{key:"setStyle",value:function(){var e=this.element.style;e.position="relative",e.willChange="transform"}},{key:"update",value:function(){var e=window.pageYOffset,t=this.rect.top+e;if(this.rect.bottom>=0&&this.rect.top<=this.wHeight){var n=this.options.offset+t,o=e-n,r=Math.round(o*this.options.factor);this.updateElement(r)}}},{key:"updateElement",value:function(e){var t="vertical"===this.options.direction?"translateY":"translateX";this.element.style.transform="".concat(t,"(").concat(e,"px)")}},{key:"animate",value:function(){this.update(),this.animateId=window.requestAnimationFrame(this.animate)}},{key:"animateElements",value:function(){this.animateId=window.requestAnimationFrame(this.deferredUpdate)}},{key:"deferredUpdate",value:function(){this.ticking||(this.ticking=!0,this.update()),this.ticking=!1}}])&&r(i.prototype,l),t}();return function(t){if(void 0===t&&(t=".paroller"),"object"==typeof t)return new l(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:{});var o=document.querySelectorAll(t);if(o.length)if(1===o.length)return new l(o[0],arguments.length>1&&void 0!==arguments[1]?arguments[1]:{});else{for(var r=[],i=0;i<o.length;i++)r.push(new l(o[i],arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}));return r}return!1}});

// Initialize paroller on elements with data-paroller-factor
(function($) {
    'use strict';
    
    $(document).ready(function() {
        if (typeof paroller !== 'undefined') {
            $('[data-paroller-factor]').each(function() {
                var factor = $(this).data('paroller-factor') || -0.3;
                var direction = $(this).data('paroller-direction') || 'vertical';
                var type = $(this).data('paroller-type') || 'scroll';
                
                paroller(this, {
                    factor: factor,
                    direction: direction,
                    type: type
                });
            });
        }
    });
    
})(jQuery);