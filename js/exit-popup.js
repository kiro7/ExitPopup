/*!
 * Ynteractive Exit Popup
 * (c) 2011-2015 Ynteractive Ltd. (http://www.ynteractive.com)
 * License: MIT
 */
(function(w) {
    "use strict";
    w.ynteractiveExitPopup = function(o) {
        var defaults = {
                width: '40%', //popup width
                height: '30%', //popup height
                target: '#ynteractive-exit-popup', //popup selector
                cookieIdentifier: 'ynteractiveExitPopup', //name of the cookie
                closeOnOutsideClick: true, //close popup if user clicks outside
                delay: 0, //delay in ms until the popup is registered
                debug: false //if true, the cookie will not be set
            },
            options = fixOptions(o),
            element = document.querySelector(options.target),
            closeBt = document.querySelector(options.target + ' .ynteractive-exit-popup-close'),
            inner = document.querySelector(options.target + ' .ynteractive-exit-popup-inner'),
            
            //cookies management helper
            cookies = {
                set: function(name, value, days) {
                    var components = [name + '=' + value];

                    if (days) {
                        var date = new Date();
                        date.setTime(date.getTime() + (days * 24 * 3600 * 1000));
                        components.push('expires=' + date.toGMTString());
                    }
                    
                    components.push('path=/');

                    document.cookie = components.join('; ');
                },
                get: function(name) {
                    var start = name + '=',
                        arr = document.cookie.split(';'),
                        i;

                    for(i = 0; i < arr.length; i++) {
                        var item = arr[i].trim();
                        
                        if (item.indexOf(start) === 0){
                            return item.substring(start.length);
                        }
                    }

                    return null;
                }
            },
            //the popup object
            pop = {
                active: false,
                mouseLeftWindow: function() {
                    element.classList.add('visible');
                    pop.detachEvents();
    
                    setTimeout(function() {
                        pop.setDimension('width', options.width);
                        pop.setDimension('height', options.height);
                    }, 20);
    
                    setTimeout(function() {
                        element.classList.add('finished');
                    }, 200);
                },
                setDimension: function(dimension, value) {
                    if (value.toString().indexOf('%') === -1) {
                        value = value + 'px';
                    }
                    
                    inner.style[dimension] = value;
                },
                attachEvents: function() {
                    function close(e) {
                        pop.destroy();
                        e.preventDefault();
                    }
                    
                    document.addEventListener('mouseout', pop.mouseLeftWindow);
                    closeBt.addEventListener('click', close);
                    
                    if (options.closeOnOutsideClick) {
                        element.addEventListener('click', close);
                        inner.addEventListener('click', function(e) {
                            e.stopPropagation();
                        });
                    }
                    
                    this.active = true;
                },
                detachEvents: function() {
                    document.removeEventListener('mouseout', pop.mouseLeftWindow);
                },
                destroy: function() {
                    if (this.active) {
                        pop.detachEvents();

                        setTimeout(function () {
                            element.parentNode.removeChild(element);
                        }, 200);
                        
                        if (!options.debug) {
                            cookies.set(options.cookieIdentifier, 1, 7);
                        }
                    }
                }
            };
        
        //helper functions
        function fixOptions(options) {
            var newOptions = {};
            
            Object.keys(defaults).forEach(function(key) {
                newOptions[key] = options.hasOwnProperty(key) ? options[key] : defaults[key];
            });
            
            return newOptions;
        }
        
        function delegate(obj, func) {
            return function() {
                func.apply(obj, arguments);
            };
        }
        
        //start logic
        if (!cookies.get(options.cookieIdentifier)) {
            if (typeof options.delay !== 'number') {
                throw new Error('options.delay must be a numeric value');
            }

            if (!element) {
                throw new Error('Could not find element with selector: ' + options.target);
            }
            
            if (element.parentNode !== document.body) {
                throw new Error(options.target + ' element must be placed directly inside of the <body> element');
            }
            
            setTimeout(delegate(pop, pop.attachEvents), options.delay);
        }
        
        //return object with public interface
        return {
            destroy: pop.destroy,
            getElement: function() {
                return element;
            }
        };
    };
})(window);