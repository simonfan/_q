//     Q
//     (c) simonfan
//     Q is licensed under the MIT terms.

/**
 * AMD and CJS module.
 *
 * @module Q
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	var _ = require('lodash'),
		q = require('q');


	exports.each = function qEach(obj, fn, ctx) {

	};

	exports.map = function qMap(obj, fn, ctx) {
		var promises = _.map.apply(_, arguments);

		return q.all(promises);
	};

	exports.mapValues = function qMapValues(obj, fn, ctx) {
		var keys     = _.keys(obj),
			promises = _.map.apply(_, arguments);

		return q.all(promises).then(function (results) {
			return _.zipObject(keys, results);
		});
	};
});
