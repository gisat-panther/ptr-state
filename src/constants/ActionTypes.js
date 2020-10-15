import {utils} from '@gisatcz/ptr-utils'

export default utils.deepKeyMirror({

	INITIALIZE: 'INITIALIZE',

	AOI_ADD: 'AOI_ADD',
	AOI_SET_ACTIVE: 'AOI_SET_ACTIVE',
	AOI_REQUEST: 'AOI_REQUEST',
	AOI_RECEIVE: 'AOI_RECEIVE',
	AOI_REQUEST_ERROR: 'AOI_REQUEST_ERROR',
	AOI_GEOMETRY_RECEIVE: 'AOI_GEOMETRY_RECEIVE',
	AOI_GEOMETRY_REQUEST_ERROR: 'AOI_GEOMETRY_REQUEST_ERROR',

	APP: {
		SET_KEY: null,
		SET_BASE_URL: null,
		SET_LOCAL_CONFIGURATION: null,
		UPDATE_LOCAL_CONFIGURATION: null,
		RECEIVE_CONFIGURATION: null
	},

	AREAS: {
		AREA_TREE_LEVELS: {
			ADD: null,
			ADD_UNRECEIVED: null,
			ENSURE: {
				ERROR: null
			},
			INDEX: {
				ADD: null,
				CLEAR_ALL: null
			},
			LOAD: {
				ERROR: null,
				REQUEST: null
			},
			SET_ACTIVE_KEY: null,
			USE: {
				INDEXED: {
					CLEAR: null,
					REGISTER: null
				},
				KEYS: {
					CLEAR: null,
					REGISTER: null
				}
			}
		},
		AREA_TREES: {
			ADD: null,
			ADD_UNRECEIVED: null,
			ENSURE: {
				ERROR: null
			},
			INDEX: {
				ADD: null,
				CLEAR_ALL: null
			},
			LOAD: {
				ERROR: null,
				REQUEST: null
			},
			SET_ACTIVE_KEY: null,
			USE: {
				INDEXED: {
					CLEAR: null,
					REGISTER: null
				},
				KEYS: {
					CLEAR: null,
					REGISTER: null
				}
			}
		}
	},

	AREA_RELATIONS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				CLEAR_ALL: null,
				REGISTER: null
			}
		}
	},

	AREAS_SELECTIONS_SET_ACTIVE_MULTIPLE: 'AREAS_SELECTIONS_SET_ACTIVE_MULTIPLE',
	AREAS_SELECTIONS_UPDATE: 'AREAS_SELECTIONS_UPDATE',

	ATTRIBUTES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			ADD_BATCH: null,
			CLEAR_ALL: null,
			CLEAR_INDEX: null,
		},
		LOAD: {
			ERROR: null,
			REQUEST: null
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			},
			INDEXED_BATCH: {
				REGISTER: null
			}
		}
	},

	ATTRIBUTE_SETS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null
		},
		LOAD: {
			ERROR: null,
			REQUEST: null
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},
	
	CASES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null,
			CLEAR_INDEX: null,
		},
		LOAD: {
			ERROR: null,
			REQUEST: null
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},

	CHOROPLETHS_SET_ACTIVE_KEYS: 'CHOROPLETHS_SET_ACTIVE_KEYS',
	CHOROPLETHS_UPDATE: 'CHOROPLETHS_UPDATE',

	COMMON: {
		DATA: {
			CLEANUP_ON_LOGOUT: null,
			SET_OUTDATED: null
		},
		EDITED: {
			REMOVE_PROPERTY_VALUES: null
		}
	},

	COMPONENTS: {
		UPDATE: null,
		SET: null,
	},

	CHARTS: {
		UPDATE: null,
		SET_INITIAL: null
	},

    DATA: {
        ATTRIBUTE_DATA: {
			ADD: null,
			UPDATE: null,
			INDEX: {
				ADD: null,
				REGISTER: null,
			},
		},
        ATTRIBUTE_DATA_SOURCES: {
			ADD: null,
			INDEX: {
				ADD: null,
			},
		},
        ATTRIBUTE_RELATIONS: {
			ADD: null,
			INDEX: {
				ADD: null,
				REGISTER: null,
			},},
        SPATIAL_DATA: {
			ADD: null,
			UPDATE: null,
			INDEX: {
				ADD: null,
				REGISTER: null,
			},
		},
        SPATIAL_DATA_SOURCES: {
			ADD: null,
			INDEX: {
				ADD: null,
			},
		},
        SPATIAL_RELATIONS: {
			ADD: null,
			INDEX: {
				ADD: null,
				REGISTER: null,
			},
		},
    },

	DATAVIEWS_REMOVE: 'DATAVIEWS_REMOVE',
	DATAVIEWS_DELETE_RECEIVE: 'DATAVIEWS_DELETE_RECEIVE',
	DATAVIEWS_DELETE_REQUEST: 'DATAVIEWS_DELETE_REQUEST',
	DATAVIEWS_DELETE_REQUEST_ERROR: 'DATAVIEWS_DELETE_REQUEST_ERROR',

	DATAVIEWS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		INDEX: {
			ADD: null,
			CLEAR_ALL: null
		},
		SET_ACTIVE_KEY: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},

	INDICATORS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null
		},
		LOAD: {
			ERROR: null,
			REQUEST: null
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},

	LAYER_PERIODS_AOI_LAYER_REQUEST: 'LAYER_PERIODS_AOI_LAYER_REQUEST',
	LAYER_PERIODS_AOI_LAYER_REQUEST_ERROR: 'LAYER_PERIODS_AOI_LAYER_REQUEST_ERROR',
	LAYER_PERIODS_AOI_LAYER_RECEIVE: 'LAYER_PERIODS_AOI_LAYER_RECEIVE',
	LAYER_PERIODS_PLACE_LAYER_REQUEST: 'LAYER_PERIODS_PLACE_LAYER_REQUEST',
	LAYER_PERIODS_PLACE_LAYER_REQUEST_ERROR: 'LAYER_PERIODS_PLACE_LAYER_REQUEST_ERROR',
	LAYER_PERIODS_PLACE_LAYER_RECEIVE: 'LAYER_PERIODS_PLACE_LAYER_RECEIVE',
	LAYER_PERIODS_KEY_LAYER_REQUEST: 'LAYER_PERIODS_KEY_LAYER_REQUEST',
	LAYER_PERIODS_KEY_LAYER_REQUEST_ERROR: 'LAYER_PERIODS_KEY_LAYER_REQUEST_ERROR',
	LAYER_PERIODS_KEY_LAYER_RECEIVE: 'LAYER_PERIODS_KEY_LAYER_RECEIVE',

	LAYER_TEMPLATES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null
		},
		LOAD: {
			ERROR: null,
			REQUEST: null
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},

	MAPS_ADD: 'MAPS_ADD',
	MAPS_REMOVE: 'MAPS_REMOVE',
	MAPS_UPDATE: 'MAPS_UPDATE',
	MAPS_UPDATE_DEFAULTS: 'MAPS_UPDATE_DEFAULTS',
	MAPS_SET_ACTIVE: 'MAPS_SET_ACTIVE',
	MAPS_SET_INDEPENDENT_OF_PERIOD: 'MAPS_SET_INDEPENDENT_OF_PERIOD',

    MAPS: {
	    SET: {
            SET_ACTIVE_MAP_KEY: null,
			SET_BACKGROUND_LAYER: null,
            VIEW: {
                SET: null,
                UPDATE: null
            }
        },
        MAP: {
	    	VIEWPORT: {
	    		SET: null,
			},
            VIEW: {
                SET: null,
                UPDATE: null
            }
        },
        UPDATE: null
    },

	_DEPRECATED_MAPS: {
		SET_INITIAL: null,
		SET_ACTIVE_MAP_KEY: null,
		SET_ACTIVE_SET_KEY: null,
		SET_SCOPE: null,
		SET_SCENARIO: null,
		SET_PERIOD: null,
		SET_PLACE: null,
		SET_CASE: null,
		SET_BACKGROUND_LAYER: null,
		SET: {
			ADD: null,
			SET_BACKGROUND_LAYER: null,
            SET_LAYERS: null,
			REMOVE: null,
			ADD_MAP: null,
			SET_MAPS: null,
			REMOVE_MAP: null,
			WORLD_WIND_NAVIGATOR: { // TODO deprecated
				SET: null,
				UPDATE: null
			},
			VIEW: {
				SET: null,
				UPDATE: null
			},
			SET_ACTIVE_MAP_KEY: null,
			SET_SYNC: null,
		},
		MAP: {
			ADD: null,
			LAYERS: {
				SET: {
					HOVERED_FEATURE_KEYS: null,
					SELECTION: null,
                    STYLE: null
				},
				CLEAR: {
					SELECTION: null
				}
			},
			REMOVE: null,
			SET_NAME: null,
			SET_DATA: null,
			WORLD_WIND_NAVIGATOR: { // TODO deprecated
				SET: null,
				UPDATE: null
			},
			VIEW: {
				SET: null,
				UPDATE: null
			}
		},
        UPDATE: null,

        // TODO deprecated
		LAYERS: {
			ADD_LAYERS: null,
			REMOVE_LAYERS: null,
			LAYER: {
				ADD: null,
                ADD_TO_SET: null,
				REMOVE: null,
				SET: null,
				UPDATE: null,
				SET_INDEX: null,
			},
			SET: null
		}
	},

	PERIODS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null,
			CLEAR_INDEX: null,
		},
		LOAD: {
			ERROR: null,
			REQUEST: null
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},

	PLACES_ADD: 'PLACES_ADD',
	PLACES_SET_ACTIVE_MULTI: 'PLACES_SET_ACTIVE_MULTI',

	PLACES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null
		},
		LOAD: {
			ERROR: null,
			REQUEST: null
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		},
	},

	REDIRECT_TO_VIEW: 'REDIRECT_TO_VIEW',

	SCENARIOS: {
		ADD: null,
		ADD_UNRECEIVED: null
	},

	SCENARIOS_ADD: 'SCENARIOS_ADD',
	SCENARIOS_EDITED_UPDATE: 'SCENARIOS_EDITED_UPDATE',
	SCENARIOS_EDITED_REMOVE: 'SCENARIOS_EDITED_REMOVE',
	SCENARIOS_EDITED_REMOVE_PROPERTY: 'SCENARIOS_EDITED_REMOVE_PROPERTY',
	SCENARIOS_SET_ACTIVE: 'SCENARIOS_SET_ACTIVE',
	SCENARIOS_SET_ACTIVE_MULTI: 'SCENARIOS_SET_ACTIVE_MULTI',
	SCENARIOS_SET_DEFAULT_SITUATION_ACTIVE: 'SCENARIOS_SET_DEFAULT_SITUATION_ACTIVE',
	SCENARIOS_CASES_ADD: 'SCENARIOS_CASES_ADD',
	SCENARIOS_CASES_REMOVE: 'SCENARIOS_CASES_REMOVE',
	SCENARIOS_CASES_SET_ACTIVE: 'SCENARIOS_CASES_SET_ACTIVE',
	SCENARIOS_UPDATE: 'SCENARIOS_UPDATE',
	SCENARIOS_REQUEST: 'SCENARIOS_REQUEST',
	SCENARIOS_RECEIVE: 'SCENARIOS_RECEIVE',
	SCENARIOS_REQUEST_ERROR: 'SCENARIOS_REQUEST_ERROR',
	SCENARIOS_CASES_REQUEST: 'SCENARIOS_CASES_REQUEST',
	SCENARIOS_CASES_RECEIVE: 'SCENARIOS_CASES_RECEIVE',
	SCENARIOS_CASES_REQUEST_ERROR: 'SCENARIOS_CASES_REQUEST_ERROR',
	SCENARIOS_CASES_UPDATE: 'SCENARIOS_CASES_UPDATE',
	SCENARIOS_CASES_EDITED_UPDATE: 'SCENARIOS_CASES_EDITED_UPDATE',
	SCENARIOS_CASES_EDITED_REMOVE: 'SCENARIOS_CASES_EDITED_REMOVE',
	SCENARIOS_CASES_EDITED_REMOVE_ACTIVE: 'SCENARIOS_CASES_EDITED_REMOVE_ACTIVE',
	SCENARIOS_CASES_EDITED_REMOVE_PROPERTY: 'SCENARIOS_CASE_EDITED_REMOVE_PROPERTY',

	SCENARIOS_API_PROCESSING_FILE_STARTED: 'SCENARIOS_API_PROCESSING_FILE_STARTED',
	SCENARIOS_API_PROCESSING_FILE_SUCCESS: 'SCENARIOS_API_PROCESSING_FILE_SUCCESS',
	SCENARIOS_API_PROCESSING_FILE_ERROR: 'SCENARIOS_API_PROCESSING_FILE_ERROR',

	SCENARIOS_CASES_API_CREATE_REQUEST: 'SCENARIOS_CASES_API_CREATE_REQUEST',
	SCENARIOS_CASES_API_CREATE_RECEIVE: 'SCENARIOS_CASES_API_CREATE_RECEIVE',
	SCENARIOS_CASES_API_CREATE_ERROR: 'SCENARIOS_CASES_API_CREATE_ERROR',
	SCENARIOS_CASES_API_DELETE_REQUEST: 'SCENARIOS_CASES_API_DELETE_REQUEST',
	SCENARIOS_CASES_API_DELETE_RECEIVE: 'SCENARIOS_CASES_API_DELETE_RECEIVE',
	SCENARIOS_CASES_API_DELETE_ERROR: 'SCENARIOS_CASES_API_DELETE_ERROR',
	SCENARIOS_CASES_API_UPDATE_REQUEST: 'SCENARIOS_CASES_API_UPDATE_REQUEST',
	SCENARIOS_CASES_API_UPDATE_RECEIVE: 'SCENARIOS_CASES_API_UPDATE_RECEIVE',
	SCENARIOS_CASES_API_UPDATE_ERROR: 'SCENARIOS_CASES_API_UPDATE_ERROR',

	SCOPES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null
		},
		LOAD: {
			ERROR: null,
			REQUEST: null
		},
		SET_ACTIVE_KEY: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},

	SCREENS: {
		ADD: null,
		CLOSE: null,
		OPEN: null,
		REMOVE: null,
		REMOVE_ALL: null,
		RETRACT: null,
		SETS: {
			ADD: null,
			REMOVE: null
		},
		TOP_HISTORY: null,
		UPDATE: null
	},

	SELECTIONS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		SET_ACTIVE_KEY: null,
		SET: {
			FEATURE_KEYS_FILTER: {
				KEYS: null
			}
		},
        CLEAR: {
		    FEATURE_KEYS_FILTER: null
        }
	},

	_DEPRECATED_SELECTIONS: {
		ADD: null,
		REMOVE: null,
		SET_ACTIVE_KEY: null,
		UPDATE_FROM_VIEW: null,
	},

	SPATIAL_RELATIONS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				CLEAR_ALL: null,
				REGISTER: null
			}
		}
	},

	SPATIAL_DATA: {
		ADD: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null
		},
		USE: {
			ADD: null,
			ADD_UNRECEIVED: null,
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		},
	},

	SPATIAL_DATA_SOURCES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null
		},
		USE: {
			ADD: null,
			ADD_UNRECEIVED: null,
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			},
			INDEXED_BATCH: {
				REGISTER: null
			}
		},



		VECTOR: {
			ADD: null,
			ADD_BATCH: null,
			ADD_UNRECEIVED: null,
			ENSURE: {
				ERROR: null
			},
			INDEX: {
				ADD: null,
				CLEAR_INDEX: null,
				CLEAR_ALL: null,
				ADD_BATCH: null
			},
			LOAD: {
				ERROR: null,
				REQUEST: null
			},
			USE: {
				INDEXED: {
					CLEAR: null,
					REGISTER: null
				},
				KEYS: {
					CLEAR: null,
					REGISTER: null
				},
				INDEXED_BATCH: {
					REGISTER: null
				}
			}
		}
	},

	ATTRIBUTE_DATA_SOURCES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null
		},
		USE: {
			ADD: null,
			ADD_UNRECEIVED: null,
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			},
			INDEXED_BATCH: {
				REGISTER: null
			}
		}
	},
	ATTRIBUTE_DATA: {
		ADD: null,
		ADD_BATCH: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null,
			ADD_BATCH: null
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			INDEXED_BATCH: {
				REGISTER: null
			}
		}
	},
	ATTRIBUTE_STATISTICS: {
		ADD: null,
		ADD_BATCH: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null,
			ADD_BATCH: null
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			INDEXED_BATCH: {
				REGISTER: null
			}
		}
	},
	ATTRIBUTE_RELATIONS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				CLEAR_ALL: null,
				REGISTER: null
			}
		}
	},

	SPATIAL_DATA_SOURCES_DOWNLOAD_FILE_ERROR: 'SPATIAL_DATA_SOURCES_DOWNLOAD_FILE_ERROR',
	SPATIAL_DATA_SOURCES_DOWNLOAD_FILE_REQUEST: 'SPATIAL_DATA_SOURCES_DOWNLOAD_FILE_REQUEST',
	SPATIAL_DATA_SOURCES_RECEIVE: 'SPATIAL_DATA_SOURCES_RECEIVE',
	SPATIAL_DATA_SOURCES_REQUEST: 'SPATIAL_DATA_SOURCES_REQUEST',
	SPATIAL_DATA_SOURCES_FILTERED_REQUEST: 'SPATIAL_DATA_SOURCES_FILTERED_REQUEST',
	SPATIAL_DATA_SOURCES_REQUEST_ERROR: 'SPATIAL_DATA_SOURCES_REQUEST_ERROR',

	SPATIAL_DATA_SOURCES_ADD: 'SPATIAL_DATA_SOURCES_ADD',
	SPATIAL_DATA_SOURCES_VECTOR_FEATURES_RECEIVE: 'SPATIAL_DATA_SOURCES_VECTOR_FEATURES_RECEIVE',
	SPATIAL_DATA_SOURCES_VECTOR_FEATURES_BBOX_REQUEST: 'SPATIAL_DATA_SOURCES_VECTOR_FEATURES_BBOX_REQUEST',
	SPATIAL_DATA_SOURCES_VECTOR_FEATURES_BBOX_REQUEST_ERROR: 'SPATIAL_DATA_SOURCES_VECTOR_FEATURES_BBOX_REQUEST_ERROR',
	SPATIAL_DATA_SOURCES_VECTOR_FEATURES_POINT_REQUEST: 'SPATIAL_DATA_SOURCES_VECTOR_FEATURES_POINT_REQUEST',
	SPATIAL_DATA_SOURCES_VECTOR_FEATURES_POINT_REQUEST_ERROR: 'SPATIAL_DATA_SOURCES_VECTOR_FEATURES_POINT_REQUEST_ERROR',
	SPATIAL_DATA_SOURCES_VECTOR_FEATURES_SELECT: 'SPATIAL_DATA_SOURCES_VECTOR_FEATURES_SELECT',
	SPATIAL_DATA_SOURCES_VECTOR_FEATURES_EDITED_ADD: 'SPATIAL_DATA_SOURCES_VECTOR_FEATURES_EDITED_ADD',

	STYLES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				CLEAR_ALL: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},

	SNAPSHOTS_ADD: 'SNAPSHOTS_ADD',
	SNAPSHOTS_REMOVE: 'SNAPSHOTS_REMOVE',


	TAGS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null
		},
		LOAD: {
			ERROR: null,
			REQUEST: null
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},

	THEMES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null
		},
		LOAD: {
			ERROR: null,
			REQUEST: null
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},

	USERS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		GROUPS: {
			ADD: null,
			ADD_UNRECEIVED: null,
			INDEX: {
				ADD: null,
				CLEAR_ALL: null
			},
			USE: {
				INDEXED: {
					CLEAR: null,
					REGISTER: null
				},
				KEYS: {
					CLEAR: null,
					REGISTER: null
				}
			}
		},
		SET_ACTIVE_KEY: null,
		CURRENT: {
			REQUEST: null
		},
		LOGIN: {
			REQUEST: null
		},
		INDEX: {
			ADD: null,
			CLEAR_ALL: null
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},

	//todo which is it? USER_GROUPS or USERS.GROUPS?
	USER_GROUPS: {
		ADD: null,
		ADD_UNRECEIVED: null
	},

	USERS_ADD: 'USERS_ADD',
	USERS_LOAD_REQUEST: 'USERS_LOAD_REQUEST',
	USERS_LOAD_REQUEST_ERROR: 'USERS_LOAD_REQUEST_ERROR',
	USERS_LOAD_CURRENT_REQUEST: 'USERS_LOAD_CURRENT_REQUEST',
	USERS_LOAD_CURRENT_REQUEST_ERROR: 'USERS_LOAD_CURRENT_REQUEST_ERROR',
	USERS_LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
	USERS_LOGIN_REQUEST_ERROR: 'USERS_LOGIN_REQUEST_ERROR',
	USERS_LOGOUT_REQUEST: 'USERS_LOGOUT_REQUEST',
	USERS_LOGOUT_REQUEST_ERROR: 'USERS_LOGOUT_REQUEST_ERROR',
	USERS_UPDATE: 'USERS_UPDATE',

	LAYER_TREES: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null
		},
		LOAD: {
			ERROR: null,
			REQUEST: null
		},
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		},
	},

	VIEWS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		DELETE: null,
		MARK_DELETED: null,
		EDITED: {
			REMOVE: null,
			REMOVE_PROPERTY: null,
			UPDATE: null,
		},
		ENSURE: {
			ERROR: null
		},
		INDEX: {
			ADD: null,
			CLEAR_INDEX: null,
			CLEAR_ALL: null
		},
		LOAD: {
			ERROR: null,
			REQUEST: null
		},
		SET_ACTIVE_KEY: null,
		SET_ACTIVE_KEYS: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},

	VISUALIZATIONS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		INDEX: {
			ADD: null,
			CLEAR_ALL: null
		},
		SET_ACTIVE_KEY: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},

	WMS_LAYERS: {
		ADD: null,
		ADD_UNRECEIVED: null,
		INDEX: {
			ADD: null,
			CLEAR_ALL: null
		},
		SET_ACTIVE_KEY: null,
		USE: {
			INDEXED: {
				CLEAR: null,
				REGISTER: null
			},
			KEYS: {
				CLEAR: null,
				REGISTER: null
			}
		}
	},

	WINDOWS: {
		ADD: null,
		OPEN: null,
		REMOVE: null,
		SETS: {
			ADD: null,
			REMOVE: null
		},
		TOP: null,
		UPDATE: null
	},

	LPIS_CASES_ADD: 'LPIS_CASES_ADD',
	LPIS_CASE_CHANGES_ADD: 'LPIS_CASE_CHANGES_ADD',
	LPIS_CASES_SEARCH_STRING_CHANGE: 'LPIS_CASES_SEARCH_STRING_CHANGE',
	LPIS_CASES_SELECTED_STATUS_CHANGE: 'LPIS_CASES_SELECTED_STATUS_CHANGE',
	LPIS_CASES_EDIT_ACTIVE_EDITED_CASE: 'LPIS_CASES_EDIT_ACTIVE_EDITED_CASE',
	LPIS_CASES_CREATE_NEW_ACTIVE_EDITED_CASE: 'LPIS_CASES_CREATE_NEW_ACTIVE_EDITED_CASE',
	LPIS_CASES_REMOVE_EDITED_CASES_BY_KEYS: 'LPIS_CASES_REMOVE_EDITED_CASES_BY_KEYS',
	LPIS_CASES_SET_ACTIVE: 'LPIS_CASES_SET_ACTIVE',
	LPIS_CASES_CLEAR_EDITED_CASE: 'LPIS_CASES_CLEAR_EDITED_CASE',
	LPIS_CASE_EDIT_ACTIVE_CASE: 'LPIS_CASE_EDIT_ACTIVE_CASE',
	LPIS_CASE_EDIT_ACTIVE_CASE_STATUS: 'LPIS_CASE_EDIT_ACTIVE_CASE_STATUS',
	LPIS_CASE_EDIT_CASE_STATUS: 'LPIS_CASE_EDIT_CASE_STATUS',
	LPIS_CASE_SET_NEXT_ACTIVE_CASE_KEY: 'LPIS_CASE_SET_NEXT_ACTIVE_CASE_KEY',

	LPISCHECK_CASES_ADD: 'LPISCHECK_CASES_ADD',
	LPISCHECK_UPDATE_CASE: 'LPISCHECK_UPDATE_CASE',
	LPISCHECK_CASES_SET_ACTIVE: 'LPISCHECK_CASES_SET_ACTIVE',
	LPIS_CHECK_CASES_SEARCH_PARAM_CHANGE: 'LPIS_CHECK_CASES_SEARCH_PARAM_CHANGE',
});


