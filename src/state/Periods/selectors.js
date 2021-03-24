import createCachedSelector from 're-reselect';
import _ from 'lodash';
import moment from 'moment';

import common from '../_common/selectors';

const getSubstate = state => state.periods;

const getAll = common.getAll(getSubstate);
const getAllAsObject = common.getAllAsObject(getSubstate);
const getActive = common.getActive(getSubstate);
const getActiveKey = common.getActiveKey(getSubstate);
const getActiveKeys = common.getActiveKeys(getSubstate);
const getActiveModels = common.getActiveModels(getSubstate);

const getByKey = common.getByKey(getSubstate);
const getByKeys = common.getByKeys(getSubstate);
const getByKeysAsObject = common.getByKeysAsObject(getSubstate);

const getDataByKey = common.getDataByKey(getSubstate);
const getDeletePermissionByKey = common.getDeletePermissionByKey(getSubstate);

const getEditedActive = common.getEditedActive(getSubstate);
const getEditedAll = common.getEditedAll(getSubstate);
const getEditedAllAsObject = common.getEditedAllAsObject(getSubstate);
const getEditedByKey = common.getEditedByKey(getSubstate);
const getEditedDataByKey = common.getEditedDataByKey(getSubstate);
const getEditedKeys = common.getEditedKeys(getSubstate);

const getIndexed = common.getIndexed(getSubstate);
const getUpdatePermissionByKey = common.getUpdatePermissionByKey(getSubstate);
const getUsedKeysForComponent = common.getUsedKeysForComponent(getSubstate);

const haveAllKeysRegisteredUse = common.haveAllKeysRegisteredUse(getSubstate);

/**
 * Both start and end time must be defined, otherwise all available periods are returned.
 */
const getByFullPeriodAsObject = createCachedSelector(
	[getAllAsObject, (state, start) => start, (state, start, end) => end],
	(periods, start, end) => {
		if (periods && start && end) {
			return _.pickBy(periods, period => {
				const periodStart = period.data && period.data.start;
				const periodEnd = period.data && period.data.end;

				if (periodStart && periodEnd) {
					return (
						moment(periodStart).isBetween(start, end, null, '[]') &&
						moment(periodEnd).isBetween(start, end, null, '[]')
					);
				} else if (periodStart) {
					return moment(periodStart).isBetween(start, end, null, '[]');
				} else if (periodEnd) {
					return moment(periodEnd).isBetween(start, end, null, '[]');
				} else {
					return true;
				}
			});
		} else {
			return periods;
		}
	}
)((state, start, end) => `${start}_${end}`);

export default {
	getActive,
	getActiveKey,
	getActiveKeys,
	getActiveModels,
	getAll,
	getAllAsObject,

	getByKey,
	getByKeys,
	getByKeysAsObject,
	getByFullPeriodAsObject,

	getDataByKey,
	getDeletePermissionByKey,

	getEditedActive,
	getEditedAll,
	getEditedAllAsObject,
	getEditedByKey,
	getEditedDataByKey,
	getEditedKeys,

	getIndexed,
	getUpdatePermissionByKey,
	getUsedKeysForComponent,

	haveAllKeysRegisteredUse,

	getSubstate,
};
