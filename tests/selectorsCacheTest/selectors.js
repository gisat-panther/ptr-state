import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';

const getEurope = state => state.countries.europe;
const getAfrica = state => state.countries.africa;
const getAsia = state => state.countries.asia;

const getEuropeCountryByKey = createCachedSelector(
	[getEurope, (state, key) => key],
	(europe, key) => {
		if (europe && key) {
			return {
				...europe[key],
				case: 'European country',
			};
		} else {
			return null;
		}
	}
)((state, key) => key);

const getAfricaCountryByKey = createCachedSelector(
	[getAfrica, (state, key) => key],
	(africa, key) => {
		if (africa && key) {
			return {
				...africa[key],
				case: 'African country',
			};
		} else {
			return null;
		}
	}
)((state, key) => key);

const getAsiaCountryByKey = createCachedSelector(
	[getAsia, (state, key) => key],
	(asia, key) => {
		if (asia && key) {
			return {
				...asia[key],
				case: 'Asian country',
			};
		} else {
			return null;
		}
	}
)((state, key) => key);

const getThreeCountries = createCachedSelector(
	[
		(state, europeKey) => getEuropeCountryByKey(state, europeKey),
		(state, europeKey, africaKey) => getAfricaCountryByKey(state, africaKey),
		(state, europeKey, africaKey, asiaKey) =>
			getAsiaCountryByKey(state, asiaKey),
	],
	(europeanCountry, africanCountry, asianCountry) => {
		return [europeanCountry, africanCountry, asianCountry];
	}
)(
	(state, europeKey, africaKey, asiaKey) =>
		`${europeKey}_${africaKey}_${asiaKey}`
);

export default {
	countries: {
		getEuropeCountryByKey,
		getAfricaCountryByKey,
		getAsiaCountryByKey,
		getThreeCountries,
	},
};
