import createCachedSelector from 're-reselect';
import {isEmpty as _isEmpty, pickBy as _pickBy} from 'lodash';
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
const getStateToSave = common.getStateToSave(getSubstate);
const getUpdatePermissionByKey = common.getUpdatePermissionByKey(getSubstate);
const getUsedKeysForComponent = common.getUsedKeysForComponent(getSubstate);

const haveAllKeysRegisteredUse = common.haveAllKeysRegisteredUse(getSubstate);

/**
 * Both start and end time must be defined, otherwise all available periods are returned.
 */

/**
 * Get periods which are between defined bounds
 * @param state {Object}
 * @param start {string} moment-like time string
 * @param end {string} moment-like time string
 * @param {Array} Collection of models
 */
const getByFullPeriodAsObject = createCachedSelector(
	[getAllAsObject, (state, start) => start, (state, start, end) => end],
	(periods, start, end) => {
		if (periods && start && end) {
			const selectedPeriods = _pickBy(periods, period => {
				const periodStart = period.data?.start;
				const periodEnd = period.data?.end;

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
					return false;
				}
			});

			return _isEmpty(selectedPeriods) ? null : selectedPeriods;
		} else {
			return null;
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

	getStateToSave,
	getSubstate,

	getUpdatePermissionByKey,
	getUsedKeysForComponent,

	haveAllKeysRegisteredUse,
};
