import {assert} from 'chai';
import selectorHelpers from "../../../src/state/Maps/selectorHelpers";
import testHelpers from "../../helpers";

describe('state/Maps/selectorHelpers', function () {
    describe('getBackgroundLayerAsLayer', function () {
        const backgroundLayer = {
            layerTemplateKey: "layerTemplate-uuid"
        };

        const expectedResult = {
            key: "pantherBackgroundLayer",
            layerTemplateKey: "layerTemplate-uuid"
        };

        it('should return backgroundLayer as layer', () => {
            // check structure
            assert.deepStrictEqual(selectorHelpers.getBackgroundLayerAsLayer(backgroundLayer), expectedResult);
        });

        testHelpers.testCache(selectorHelpers.getBackgroundLayerAsLayer, [backgroundLayer], expectedResult);
    });

    describe('mergeBackgroundLayerWithLayers', function () {
        const backgroundLayer = {
            layerTemplateKey: "layerTemplate-uuid"
        };

        const layers = [
            {
                key: "layer-1",
                metadataModifiers: {
                    caseKey: "case-1"
                }
            }
        ];

        const expectedResult = [
            {
                key: "pantherBackgroundLayer",
                layerTemplateKey: "layerTemplate-uuid"
            },
            {
                key: "layer-1",
                metadataModifiers: {
                    caseKey: "case-1"
                }
            }
        ];

        it('should return merged layers', () => {
            // check structure
            assert.deepStrictEqual(selectorHelpers.mergeBackgroundLayerWithLayers(backgroundLayer, layers), expectedResult);
        });

        testHelpers.testCache(selectorHelpers.mergeBackgroundLayerWithLayers, [backgroundLayer, layers], expectedResult);

        it('should return null, if both backgroundLayer and layers are null', () => {
            // check structure
            assert.isNull(selectorHelpers.mergeBackgroundLayerWithLayer(null, null));
        });

        it('should return layer with one item, if layers are null, but backgroundLayer', () => {
            // check structure
            assert.deepStrictEqual(selectorHelpers.mergeBackgroundLayerWithLayers(backgroundLayer), [expectedResult[0]]);
        });
    });
});
