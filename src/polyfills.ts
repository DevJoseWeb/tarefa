import "core-js/es6";
import "core-js/es7/reflect";

// Necessary for IE10
Object.setPrototypeOf =
    Object.setPrototypeOf ||
    function(obj, proto) {
        obj.__proto__ = proto;
        return obj;
    };

import "zone.js/dist/zone";
