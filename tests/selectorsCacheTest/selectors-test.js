import Select from '../../src/state/Select';
import {assert} from 'chai';
import selectorsCacheTest from './selectors';
import testHelpers from '../helpers';

describe('selectorsCacheTest', function () {
	const state = {
		countries: {
			europe: {
				germany: {
					name: 'Germany',
				},
				france: {
					name: 'France',
				},
			},
			asia: {
				china: {
					name: 'China',
				},
				japan: {
					name: 'Japan',
				},
			},
			africa: {
				egypt: {
					name: 'Egypt',
				},
				mali: {
					name: 'Mali',
				},
			},
		},
		cities: {
			newYork: {
				name: '',
			},
		},
	};

	describe('getEuropeCountryByKey', function () {
		const expectedResult = {
			case: 'European country',
			name: 'Germany',
		};

		const updatedState = {
			...state,
			cities: {
				...state.cities,
				prague: {},
			},
		};

		it('should return expected country', () => {
			const output = selectorsCacheTest.countries.getEuropeCountryByKey(
				state,
				'germany'
			);
			assert.deepStrictEqual(output, expectedResult);
		});

		testHelpers.testCache(
			selectorsCacheTest.countries.getEuropeCountryByKey,
			[state, 'germany'],
			expectedResult,
			[updatedState, 'france']
		);

		it('should return cached value', () => {
			const output = selectorsCacheTest.countries.getEuropeCountryByKey(
				state,
				'germany'
			);
			const updatedState2 = {
				...state,
				countries: {
					...state.countries,
					europe: {
						...state.countries.europe,
						czechia: {},
					},
				},
			};

			const midtermOutput = selectorsCacheTest.countries.getEuropeCountryByKey(
				state,
				'france'
			);
			const secondOutput = selectorsCacheTest.countries.getEuropeCountryByKey(
				updatedState2,
				'germany'
			);

			assert.notEqual(output, secondOutput);
		});

		it('should return cached value', () => {
			const output = selectorsCacheTest.countries.getEuropeCountryByKey(
				state,
				'germany'
			);
			const updatedState = {
				...state,
				cities: {
					...state.cities,
					prague: {},
				},
			};

			const secondOutput = selectorsCacheTest.countries.getEuropeCountryByKey(
				updatedState,
				'germany'
			);

			assert.equal(output, secondOutput);
		});
	});

	describe('getThreeCountries', function () {
		const expectedResult = [
			{
				case: 'European country',
				name: 'Germany',
			},
			{
				case: 'African country',
				name: 'Egypt',
			},
			{
				case: 'Asian country',
				name: 'Japan',
			},
		];

		it('should return expected countries', () => {
			const output = selectorsCacheTest.countries.getThreeCountries(
				state,
				'germany',
				'egypt',
				'japan'
			);
			assert.deepStrictEqual(output, expectedResult);
		});

		it('should return expected', () => {
			const output = selectorsCacheTest.countries.getThreeCountries(
				state,
				'germany',
				'egypt',
				'japan'
			);
			const output2 = selectorsCacheTest.countries.getThreeCountries(
				state,
				'germany',
				'mali',
				'japan'
			);
			const output3 = selectorsCacheTest.countries.getThreeCountries(
				state,
				'germany',
				'egypt',
				'japan'
			);

			assert.notEqual(output, output2);
			assert.equal(output, output3);
		});

		testHelpers.testCache(
			selectorsCacheTest.countries.getThreeCountries,
			[state, 'germany', 'egypt', 'japan'],
			expectedResult,
			[state, 'germany', 'egypt', 'china']
		);

		it('should return cached value', () => {
			const output = selectorsCacheTest.countries.getThreeCountries(
				state,
				'germany',
				'egypt',
				'japan'
			);
			const updatedState = {
				...state,
				cities: {
					...state.cities,
					prague: {},
				},
			};

			const secondOutput = selectorsCacheTest.countries.getThreeCountries(
				updatedState,
				'germany',
				'egypt',
				'japan'
			);

			assert.equal(output, secondOutput);
		});

		it('should return cached value 2', () => {
			const output = selectorsCacheTest.countries.getThreeCountries(
				state,
				'germany',
				'egypt',
				'japan'
			);
			const updatedState = {
				...state,
				countries: {
					...state.countries,
					america: {},
				},
			};

			const secondOutput = selectorsCacheTest.countries.getThreeCountries(
				updatedState,
				'germany',
				'egypt',
				'japan'
			);

			assert.equal(output, secondOutput);
		});

		it('should not return cached value', () => {
			const output = selectorsCacheTest.countries.getThreeCountries(
				state,
				'germany',
				'egypt',
				'japan'
			);
			const updatedState = {
				...state,
				countries: {
					...state.countries,
					europe: {
						...state.countries.europe,
						spain: {},
					},
				},
			};

			const secondOutput = selectorsCacheTest.countries.getThreeCountries(
				updatedState,
				'germany',
				'egypt',
				'japan'
			);

			assert.notEqual(output, secondOutput);
		});
	});
});
