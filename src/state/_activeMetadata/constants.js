import Select from '../Select';
import ActionTypes from '../../constants/ActionTypes';

/**
 * A list of stores where indexes should be checked, if they depend on given filter by active.
 * The collection item has following structure: {storeKey: [getSubstate, data type, action types, category path ('metadata' by default)]}
 */
export const STORES_TO_ENSURE_WITH_FILTER_BY_ACTIVE = {
	areaRelations: [
		Select.areaRelations.getSubstate,
		'area',
		ActionTypes.AREA_RELATIONS,
		'relations',
	],
	areaTrees: [
		Select.areas.areaTrees.getSubstate,
		'areaTrees',
		ActionTypes.AREAS.AREA_TREES,
	],
	areaTreeLevels: [
		Select.areas.areaTrees.getSubstate,
		'areaTreeLevels',
		ActionTypes.AREAS.AREA_TREE_LEVELS,
	],
	attributes: [
		Select.attributes.getSubstate,
		'attributes',
		ActionTypes.ATTRIBUTES,
	],
	attributeSets: [
		Select.attributeSets.getSubstate,
		'attributes',
		ActionTypes.ATTRIBUTE_SETS,
	],
	cases: [Select.cases.getSubstate, 'cases', ActionTypes.CASES],
	layerTemplates: [
		Select.layerTemplates.getSubstate,
		'layerTemplates',
		ActionTypes.LAYER_TEMPLATES,
	],
	periods: [Select.periods.getSubstate, 'periods', ActionTypes.PERIODS],
	places: [Select.places.getSubstate, 'places', ActionTypes.PLACES],
	scenarios: [Select.scenarios.getSubstate, 'scenarios', ActionTypes.SCENARIOS],
	scopes: [Select.scopes.getSubstate, 'scopes', ActionTypes.SCOPES],
	tags: [Select.tags.getSubstate, 'tags', ActionTypes.TAGS],
	views: [Select.views.getSubstate, 'views', ActionTypes.VIEWS, 'views'],
};
