(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'_q',
		// dependencies for the test
		deps = [mod, 'should', 'q', 'lodash'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(_q, should, q, _) {
	'use strict';

	describe('_q basics', function () {
		beforeEach(function (done) {
			done();
		});

		it('mapValues', function (done) {


			function delayedAdd5To(value) {

				return q(value + 5).delay(150);

			}


			var original = {
				one: 1,
				two: 2,
				twelve: 12,
			};


			var mapDefer = _q.mapValues(original, delayedAdd5To);


			mapDefer.done(function (res) {

				res.should.eql({
					one: 6,
					two: 7,
					twelve: 17
				});

				done();

			});

		});

		it('each', function (done) {

			var obj = {};

			function delayedSetValue(value, key) {
				var defer = q.defer();

				_.keys(obj).length.should.eql(key);


				setTimeout(function () {

					obj[key + '-lalala'] = value;

					defer.resolve();

				}, 150)

				return defer.promise;
			}


			_q.each(['a', 'b', 'c'], delayedSetValue)
				.done(function () {
					obj.should.eql({
						'0-lalala': 'a',
						'1-lalala': 'b',
						'2-lalala': 'c'
					});

					done();
				});
		})

		it('reduce', function (done) {
			function delayedAdd5To(acc, value) {



				return q(acc + value + 5).delay(150);
			}

			var values = [1, 2, 3];


			_.reduce(values, function (acc, v) { return acc + v + 5; }, 0).should.eql(0 + 1 + 5 + 2 + 5 + 3 + 5);

			_q.reduce(values, delayedAdd5To, 0).done(function (result) {
				result.should.eql(0 + 1 + 5 + 2 + 5 + 3 + 5);

				done();
			});
		})
	});
});
