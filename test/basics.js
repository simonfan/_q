(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'_q',
		// dependencies for the test
		deps = [mod, 'should', 'q'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(_q, should, q) {
	'use strict';

	describe('_q basics', function () {
		beforeEach(function (done) {
			done();
		});

		it('is fine (:', function (done) {


			function delayedAdd5To(value) {

				return q(value + 5).delay(400);

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
	});
});
