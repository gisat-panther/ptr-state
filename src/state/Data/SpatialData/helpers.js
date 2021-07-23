const isSpatialDataTiled = spatialData => {
	const spatialDSTiled = [];
	for (const [dsKey, datasource] of Object.entries(spatialData)) {
		if (datasource.hasOwnProperty('spatialIndex')) {
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
