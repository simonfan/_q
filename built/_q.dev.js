//     Q
//     (c) simonfan
//     Q is licensed under the MIT terms.

/**
 * AMD and CJS module.
 *
 * @module Q
 */

/* jshint ignore:start */

/* jshint ignore:end */

define('_q',['require','exports','module','lodash','q'],function (require, exports, module) {
	

	var _ = require('lodash'),
		q = require('q');

	/**
	 * [qMap description]
	 * @param  {[type]}   arr [description]
	 * @param  {Function} fn  [description]
	 * @param  {[type]}   ctx [description]
	 * @return {[type]}       [description]
	 */
	function qMap(arr, fn, ctx) {
		var promises = _.map.apply(_, arguments);

		return q.all(promises);
	}

	/**
	 * [qMapValues description]
	 * @param  {[type]}   obj [description]
	 * @param  {Function} fn  [description]
	 * @param  {[type]}   ctx [description]
	 * @return {[type]}       [description]
	 */
	function qMapValues(obj, fn, ctx) {
		var keys     = _.keys(obj),
			promises = _.map.apply(_, arguments);

		return q.all(promises).then(function (results) {
			return _.zipObject(keys, results);
		});
	}

	/**
	 * [qReduce description]
	 * @param  {[type]}   arr     [description]
	 * @param  {Function} fn      [description]
	 * @param  {[type]}   initial [description]
	 * @param  {[type]}   ctx     [description]
	 * @return {[type]}           [description]
	 */
	function qReduce(arr, fn, initial, ctx) {

		return _.reduce(arr, function (sofar, val, index) {

			return sofar.then(function (res) {
				// basically a partial right
				return fn(res, val, index);
			});

		}, q(initial));
	}

	/**
	 * Loops asynchronously.
	 *
	 * @method qEach
	 * @param  {Array}   arr [description]
	 * @param  {Function} fn  [description]
	 * @param  {[type]}   ctx [description]
	 * @return {[type]}       [description]
	 */
	function qEach(arr, fn, ctx) {

		return _.reduce(arr, function (sofar, val, index) {
			return sofar.then(_.bind(_.partial(fn, val, index), ctx));
		}, q());
	}

	exports.map = qMap;
	exports.mapValues = qMapValues;
	exports.each = qEach;
	exports.reduce = qReduce;

});

