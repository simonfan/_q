//     Q
//     (c) simonfan
//     Q is licensed under the MIT terms.

define("_q",["require","exports","module","lodash","q"],function(n,e){function r(){var n=c.map.apply(c,arguments);return i.all(n)}function t(n){var e=c.keys(n),r=c.map.apply(c,arguments);return i.all(r).then(function(n){return c.zipObject(e,n)})}function u(n,e,r){return c.reduce(n,function(n,r,t){return n.then(function(n){return e(n,r,t)})},i(r))}function a(n,e,r){return c.reduce(n,function(n,t,u){return n.then(c.bind(c.partial(e,t,u),r))},i())}var c=n("lodash"),i=n("q");e.map=r,e.mapValues=t,e.each=a,e.reduce=u});