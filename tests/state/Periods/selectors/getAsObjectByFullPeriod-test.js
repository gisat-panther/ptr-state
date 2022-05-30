import {assert} from 'chai';
import selectors from '../../../../src/state/Periods/selectors';

describe('getAsObjectByFullPeriod', function () {
	const state = {
		periods: {
			byKey: {
				period1: {
					key: 'period1',
					data: {
						start: '2015-01-01',
						end: '2020-12-31',
					},
				},
				period2: {
					key: 'period2',
					data: {
						start: '2020-12-30',
						end: '2025-12-31',
					},
				},
				period3: {
					key: 'period3',
					data: {
						start: '2020-12-30',
					},
				},
				period4: {
					key: 'period4',
					data: {
						end: '2020-12-31',
					},
				},
				period5: {
					key: 'period5',
					data: {},
				},
				period6: {
					key: 'period6',
					data: {
						start: '2015',
						end: '2020',
					},
				},
				period7: {
					key: 'period7',
					data: {
						start: '2010-12-30T20:00:00',
						end: '2010-12-30T20:00:05',
					},
				},
			},
		},
	};

	it('should return periods between bounds', function () {
		const start = '2014-12-31';
		const end = '2021-01-01';
		const periodsByKey = state.periods.byKey;

		const expectedOutput = {
			period1: periodsByKey.period1,
			period3: periodsByKey.period3,
			period4: periodsByKey.period4,
			period6: periodsByKey.period6,
		};
		const output = selectors.getAsObjectByFullPeriod(state, start, end);
		assert.deepStrictEqual(output, expectedOutput);
	});

	it('should return periods between bounds 2', function () {
		const start = '2014';
		const end = '2021';
		const periodsByKey = state.periods.byKey;

		const expectedOutput = {
			period1: periodsByKey.period1,
			period3: periodsByKey.period3,
			period4: periodsByKey.period4,
			period6: periodsByKey.period6,
		};
		const output = selectors.getAsObjectByFullPeriod(state, start, end);
		assert.deepStrictEqual(output, expectedOutput);
	});

	it('should return periods between bounds 3', function () {
		const start = '2020-12-29T20:00:00';
		const end = '2030-12-30T20:00:06';
		const periodsByKey = state.periods.byKey;

		const expectedOutput = {
			period2: periodsByKey.period2,
			period3: periodsByKey.period3,
			period4: periodsByKey.period4,
		};
		const output = selectors.getAsObjectByFullPeriod(state, start, end);
		assert.deepStrictEqual(output, expectedOutput);
	});

	it('should return periods between bounds 4', function () {
		const start = '2010-12-30T20:00:00';
		const end = '2010-12-30T20:00:06';
		const periodsByKey = state.periods.byKey;

		const expectedOutput = {
			period7: periodsByKey.period7,
		};
		const output = selectors.getAsObjectByFullPeriod(state, start, end);
		assert.deepStrictEqual(output, expectedOutput);
	});

	it('should return null if no period selected', function () {
		const start = '2010-12-30T20:00:01';
		const end = '2010-12-30T20:00:06';

		const output = selectors.getAsObjectByFullPeriod(state, start, end);
		assert.isNull(output);
	});

	it('should return null if no start period given', function () {
		const end = '2010-12-30T20:00:06';
		const output = selectors.getAsObjectByFullPeriod(state, null, end);
		assert.isNull(output);
	});

	it('should return null if no end period given', function () {
		const start = '2010-12-30T20:00:06';

		const output = selectors.getAsObjectByFullPeriod(state, start, null);
		assert.isNull(output);
	});

	it('should return null if byKey is null', function () {
		const start = '2010-12-30T20:00:00';
		const end = '2010-12-30T20:00:06';

		const output = selectors.getAsObjectByFullPeriod(
			{periods: {byKey: null}},
			start,
			end
		);
		assert.isNull(output);
	});
});
