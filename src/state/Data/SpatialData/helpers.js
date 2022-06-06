/**
 * Check if all spatialData has spatialIndex, which indecates tiled dataSource
 * @param {Object} spatialData Object of spatialDataSources
 * @returns {Boolean}
 */
const isSpatialDataTiled = spatialData => {
	const spatialDSTiled = [];
	for (const [, datasource] of Object.entries(spatialData)) {
		if (Object.hasOwn(datasource, 'spatialIndex')) {
			spatialDSTiled.push(true);
		} else {
			spatialDSTiled.push(false);
		}
	}

	return spatialDSTiled.every(tiled => tiled);
};

export default {
	isSpatialDataTiled,
};
