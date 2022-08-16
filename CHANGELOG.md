# v2.1.5 (Tue Aug 16 2022)

#### 🐾 Patch

- Add selectors/reducers/actions for better manage timeline state [#133](https://github.com/gisat-panther/ptr-state/pull/133) ([@vdubr](https://github.com/vdubr))

#### Authors: 1

- Vojtěch Dubrovský ([@vdubr](https://github.com/vdubr))

---

# v2.1.4 (Fri Aug 05 2022)

#### 🐾 Patch

- Extent requestWrapper for missing parameters [#132](https://github.com/gisat-panther/ptr-state/pull/132) ([@vdubr](https://github.com/vdubr))

#### Authors: 1

- Vojtěch Dubrovský ([@vdubr](https://github.com/vdubr))

---

# v2.1.3 (Wed Aug 03 2022)

#### 🐾 Patch

- Fix user ActionTypes, fix user login/logout requests for newer BE [#131](https://github.com/gisat-panther/ptr-state/pull/131) ([@vdubr](https://github.com/vdubr))

#### Authors: 1

- Vojtěch Dubrovský ([@vdubr](https://github.com/vdubr))

---

# v2.1.2 (Fri Jul 29 2022)

#### 🐾 Patch

- Add setting for pickable WMS layers. [#130](https://github.com/gisat-panther/ptr-state/pull/130) ([@vdubr](https://github.com/vdubr))

#### Authors: 1

- Vojtěch Dubrovský ([@vdubr](https://github.com/vdubr))

---

# v2.1.1 (Thu Jul 21 2022)

#### 🐾 Patch

- Fix loading attributes for non tiled datasources [#128](https://github.com/gisat-panther/ptr-state/pull/128) ([@vdubr](https://github.com/vdubr))

#### Authors: 1

- Vojtěch Dubrovský ([@vdubr](https://github.com/vdubr))

---

# v2.1.0 (Mon Jun 27 2022)

#### 🚀 Enhancement

- :sparkles: [#126](https://github.com/gisat-panther/ptr-state/pull/126) ([@vdubr](https://github.com/vdubr))

#### Authors: 1

- Vojtěch Dubrovský ([@vdubr](https://github.com/vdubr))

---

# v2.0.3 (Tue Jun 21 2022)

#### 🐾 Patch

- Fix request page size data type [#124](https://github.com/gisat-panther/ptr-state/pull/124) ([@vlach1989](https://github.com/vlach1989))

#### Authors: 1

- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v2.0.2 (Thu Jun 16 2022)

#### 🐾 Patch

- AttributeRelations: ensure [#123](https://github.com/gisat-panther/ptr-state/pull/123) ([@vlach1989](https://github.com/vlach1989))

#### Authors: 1

- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v2.0.1 (Wed Jun 15 2022)

#### 🐾 Patch

- Feature/sdg updates [#122](https://github.com/gisat-panther/ptr-state/pull/122) ([@vlach1989](https://github.com/vlach1989))

#### Authors: 1

- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v2.0.0 (Mon May 30 2022)

#### 💥 Breaking Change

- Setup data substore [#43](https://github.com/gisat-panther/ptr-state/pull/43) ([@vlach1989](https://github.com/vlach1989))

#### 🚀 Enhancement

- Put react as a peerDependency. [#93](https://github.com/gisat-panther/ptr-state/pull/93) ([@vdubr](https://github.com/vdubr) [@vlach1989](https://github.com/vlach1989))
- Fix/ssr [#75](https://github.com/gisat-panther/ptr-state/pull/75) ([@vdubr](https://github.com/vdubr))

#### 🐾 Patch

- Fix/prepare dev to merge with master [#118](https://github.com/gisat-panther/ptr-state/pull/118) ([@nenadalm](https://github.com/nenadalm) [@vdubr](https://github.com/vdubr) ci@example.com [@vlach1989](https://github.com/vlach1989) [@mbabic84](https://github.com/mbabic84))
- Fix timeline selectors for active layers, add common.getAllActiveKeysObserver [#117](https://github.com/gisat-panther/ptr-state/pull/117) ([@vdubr](https://github.com/vdubr))
- Feature/spatial data sources updates [#116](https://github.com/gisat-panther/ptr-state/pull/116) ([@vdubr](https://github.com/vdubr))
- Add support for cog layer [#114](https://github.com/gisat-panther/ptr-state/pull/114) ([@vdubr](https://github.com/vdubr))
- Export setFeatureKeysFilterKeys action [#112](https://github.com/gisat-panther/ptr-state/pull/112) ([@vdubr](https://github.com/vdubr))
- Fix timeline selectors [#110](https://github.com/gisat-panther/ptr-state/pull/110) ([@vdubr](https://github.com/vdubr))
- Fix timeline selectors [#109](https://github.com/gisat-panther/ptr-state/pull/109) ([@vdubr](https://github.com/vdubr))
- Add components, actions and selectors for controlled MapTimeline [#108](https://github.com/gisat-panther/ptr-state/pull/108) ([@vdubr](https://github.com/vdubr))
- Add selectors/actions/reducers for removing layers from map by filter. [#107](https://github.com/gisat-panther/ptr-state/pull/107) ([@vdubr](https://github.com/vdubr))
- Data/selectors: getFeatures - do not omit attributes with null, 0 or … [#106](https://github.com/gisat-panther/ptr-state/pull/106) ([@vlach1989](https://github.com/vlach1989))
- Load missing attributes from dataEndpoint if DS is type vector [#105](https://github.com/gisat-panther/ptr-state/pull/105) ([@vdubr](https://github.com/vdubr))
- Maps: remove map layers & tests [#104](https://github.com/gisat-panther/ptr-state/pull/104) ([@vlach1989](https://github.com/vlach1989))
- Maps: remove all layers from map & tests [#103](https://github.com/gisat-panther/ptr-state/pull/103) ([@vlach1989](https://github.com/vlach1989))
- fix path to application [#102](https://github.com/gisat-panther/ptr-state/pull/102) ([@vlach1989](https://github.com/vlach1989))
- Feature/components [#101](https://github.com/gisat-panther/ptr-state/pull/101) ([@vdubr](https://github.com/vdubr))
- Add remove mothod to the component state [#100](https://github.com/gisat-panther/ptr-state/pull/100) ([@vdubr](https://github.com/vdubr))
- upgrade dependencies & map layer opacity [#99](https://github.com/gisat-panther/ptr-state/pull/99) ([@vlach1989](https://github.com/vlach1989))
- Feature/mirror updates [#98](https://github.com/gisat-panther/ptr-state/pull/98) ([@vdubr](https://github.com/vdubr))
- Feature/previous level [#92](https://github.com/gisat-panther/ptr-state/pull/92) ([@vlach1989](https://github.com/vlach1989) [@vdubr](https://github.com/vdubr))
- Add setActiveKey actin to the Users store [#97](https://github.com/gisat-panther/ptr-state/pull/97) ([@vdubr](https://github.com/vdubr))
- Export initial states from all reducers [#96](https://github.com/gisat-panther/ptr-state/pull/96) ([@vdubr](https://github.com/vdubr))
- upgrade react-redux & reduc [#95](https://github.com/gisat-panther/ptr-state/pull/95) ([@vlach1989](https://github.com/vlach1989))
- Remove auto package [#94](https://github.com/gisat-panther/ptr-state/pull/94) ([@vdubr](https://github.com/vdubr))
- Feature/areas [#90](https://github.com/gisat-panther/ptr-state/pull/90) ([@vlach1989](https://github.com/vlach1989) [@vdubr](https://github.com/vdubr))
- Feature/maps [#91](https://github.com/gisat-panther/ptr-state/pull/91) ([@vlach1989](https://github.com/vlach1989))
- Feature/maps [#87](https://github.com/gisat-panther/ptr-state/pull/87) ([@vlach1989](https://github.com/vlach1989))
- Fixes [#85](https://github.com/gisat-panther/ptr-state/pull/85) ([@vlach1989](https://github.com/vlach1989) [@vdubr](https://github.com/vdubr))
- Feature/actions tests [#80](https://github.com/gisat-panther/ptr-state/pull/80) ([@vdubr](https://github.com/vdubr))
- Action updateComponent do not mutate original component state [#82](https://github.com/gisat-panther/ptr-state/pull/82) ([@vdubr](https://github.com/vdubr))
- fix/map-selectors [#81](https://github.com/gisat-panther/ptr-state/pull/81) ([@vdubr](https://github.com/vdubr))
- New maps functionality [#77](https://github.com/gisat-panther/ptr-state/pull/77) ([@vlach1989](https://github.com/vlach1989) [@vdubr](https://github.com/vdubr))
- Temporary change api path for configuration [#76](https://github.com/gisat-panther/ptr-state/pull/76) ([@vdubr](https://github.com/vdubr))
- Feature/attribute data endpoint [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989) [@vdubr](https://github.com/vdubr))
- Feature/change attribute ep structure [#71](https://github.com/gisat-panther/ptr-state/pull/71) ([@vdubr](https://github.com/vdubr) [@vlach1989](https://github.com/vlach1989))
- Ensure dependencies of active metadata - remove circular dependency [#68](https://github.com/gisat-panther/ptr-state/pull/68) ([@vlach1989](https://github.com/vlach1989))
- Maintenance/code styling [#66](https://github.com/gisat-panther/ptr-state/pull/66) ([@vdubr](https://github.com/vdubr) [@vlach1989](https://github.com/vlach1989))
- Feature/improve tests [#65](https://github.com/gisat-panther/ptr-state/pull/65) ([@vdubr](https://github.com/vdubr))
- Data/components - fix duplicity [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Format actions [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vdubr](https://github.com/vdubr))
- Merge branch 'tmp' into feature/attribute-data-endpoint [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vdubr](https://github.com/vdubr))
- Revert formating [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vdubr](https://github.com/vdubr))
- Support custom pagesize, limit, start in component attribute data endpoint [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vdubr](https://github.com/vdubr))
- Data/components - set component key [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Merge commit '39968d7c1fc3b33f24be3d9399603e7fede614f2' into feature/attributeData [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vdubr](https://github.com/vdubr))
- Fix bug in load action [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vdubr](https://github.com/vdubr))
- Fix getData selector [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vdubr](https://github.com/vdubr))
- Load attribute data by pages [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vdubr](https://github.com/vdubr))
- Update common request method. Response object can have other than "data" object inside. [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vdubr](https://github.com/vdubr))
- Use spatial suffix in attribute actions and redusers that use spatial filter [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vdubr](https://github.com/vdubr))
- Move & rename common recompute observers & selectors [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- AttributeRelations/selectors - fix & tests [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Add ensure structure [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vdubr](https://github.com/vdubr))
- remove empty files [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Merge branch 'maintenance/code-styling' into feature/attributeData [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- formatted code [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Merge branch 'dev' into feature/attributeData [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Fix/performance [#64](https://github.com/gisat-panther/ptr-state/pull/64) ([@vlach1989](https://github.com/vlach1989))
- Fix getting tiles [#63](https://github.com/gisat-panther/ptr-state/pull/63) ([@vdubr](https://github.com/vdubr))
- Maintenance/cleanup upgrades [#62](https://github.com/gisat-panther/ptr-state/pull/62) ([@vlach1989](https://github.com/vlach1989))
- Feature/data endpoint ensure [#56](https://github.com/gisat-panther/ptr-state/pull/56) ([@vdubr](https://github.com/vdubr) [@vlach1989](https://github.com/vlach1989))
- Component/actions - simplify updateStateFromView [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- DataComponents - update components selectors [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- fix updateStore reducer & add updateStore option to Components [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- common - updateStore action [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Data/Components - getData selector - get data for multiple attributes, getDataForScatterChart - initial [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Data/Components - getData selector - get attributes from relations [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- fix wrong import & add externals to rollup.test.config [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- upgrade dependencies [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Data/AttributeData/reducers - fix missing import [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Merge branch 'feature/dataEndpointEnsure' into feature/attributeData [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Data/components - specific selector example 2 [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Data/components - specific selector example [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Data - attribute data, ds & components selectors [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- move some methods to common [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- export recompute methods [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Data - updateStore action [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Data/components - update components from view [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- dependencies update [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Data/components - initial commit [#73](https://github.com/gisat-panther/ptr-state/pull/73) ([@vlach1989](https://github.com/vlach1989))
- Fix/data end fix1 [#59](https://github.com/gisat-panther/ptr-state/pull/59) ([@vdubr](https://github.com/vdubr))
- Data endpoint - first set of commits [#48](https://github.com/gisat-panther/ptr-state/pull/48) ([@vlach1989](https://github.com/vlach1989) ci@example.com [@vdubr](https://github.com/vdubr))
- Add updateStateFromView to scenarios and places stores [#53](https://github.com/gisat-panther/ptr-state/pull/53) ([@vdubr](https://github.com/vdubr))
- Add spatial filter to data endpoint with tiles and level [#52](https://github.com/gisat-panther/ptr-state/pull/52) ([@vdubr](https://github.com/vdubr))
- Fix ptr-utils map view paths [#50](https://github.com/gisat-panther/ptr-state/pull/50) ([@vdubr](https://github.com/vdubr))

#### Authors: 5

- [@mbabic84](https://github.com/mbabic84)
- ci (ci@example.com)
- Miloslav Nenadál ([@nenadalm](https://github.com/nenadalm))
- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))
- Vojtěch Dubrovský ([@vdubr](https://github.com/vdubr))

---

# v1.5.16 (Wed Jul 07 2021)

#### 🐾 Patch

- Update dependencies [#89](https://github.com/gisat-panther/ptr-state/pull/89) ([@vdubr](https://github.com/vdubr))

#### Authors: 1

- Vojtěch Dubrovský ([@vdubr](https://github.com/vdubr))

---

# v1.5.15 (Mon Mar 01 2021)

#### 🐾 Patch

- Fix logout path [#69](https://github.com/gisat-panther/ptr-state/pull/69) ([@vdubr](https://github.com/vdubr))

#### Authors: 1

- Vojtěch Dubrovský ([@vdubr](https://github.com/vdubr))

---

# v1.5.14 (Fri Feb 19 2021)

#### 🐾 Patch

- upgrade & cleanup dependencies, change tests settings [#67](https://github.com/gisat-panther/ptr-state/pull/67) ([@vlach1989](https://github.com/vlach1989))

#### Authors: 1

- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v1.5.13 (Mon Dec 14 2020)

#### 🐾 Patch

- remove "backend" from paths [#61](https://github.com/gisat-panther/ptr-state/pull/61) ([@mbabic84](https://github.com/mbabic84))

#### Authors: 1

- [@mbabic84](https://github.com/mbabic84)

---

# v1.5.12 (Thu Nov 12 2020)

#### 🐾 Patch

- Maps actions - set viewport only if it was changed [#58](https://github.com/gisat-panther/ptr-state/pull/58) ([@vlach1989](https://github.com/vlach1989))

#### Authors: 1

- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v1.5.11 (Mon Nov 09 2020)

#### 🐾 Patch

- Set/get map viewport to/from state [#57](https://github.com/gisat-panther/ptr-state/pull/57) ([@vlach1989](https://github.com/vlach1989))

#### Authors: 1

- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v1.5.10 (Thu Oct 15 2020)

#### 🐾 Patch

- Prevent empty relations in periods selector [#55](https://github.com/gisat-panther/ptr-state/pull/55) ([@vdubr](https://github.com/vdubr))

#### Authors: 1

- Vojtěch Dubrovský ([@vdubr](https://github.com/vdubr))

---

# v1.5.9 (Thu Sep 17 2020)

#### 🐾 Patch

- Additional tests [#45](https://github.com/gisat-panther/ptr-state/pull/45) ([@nenadalm](https://github.com/nenadalm))

#### Authors: 1

- Miloslav Nenadál ([@nenadalm](https://github.com/nenadalm))

---

# v1.5.8 (Wed Sep 16 2020)

#### 🐾 Patch

- Fix ptr-utils map view paths [#49](https://github.com/gisat-panther/ptr-state/pull/49) ([@vdubr](https://github.com/vdubr))

#### Authors: 1

- Vojtěch Dubrovský ([@vdubr](https://github.com/vdubr))

---

# v1.5.7 (Wed Sep 02 2020)

#### 🐾 Patch

- Maps - update some reducers [#47](https://github.com/gisat-panther/ptr-state/pull/47) ([@vlach1989](https://github.com/vlach1989))

#### Authors: 1

- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v1.5.6 (Tue Sep 01 2020)

#### 🐾 Patch

- Maps - getActiveMap selector [#46](https://github.com/gisat-panther/ptr-state/pull/46) ([@vlach1989](https://github.com/vlach1989))

#### Authors: 1

- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v1.5.5 (Thu Aug 27 2020)

#### 🐾 Patch

- Feature/updates [#44](https://github.com/gisat-panther/ptr-state/pull/44) ([@vlach1989](https://github.com/vlach1989))

#### Authors: 1

- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v1.5.4 (Tue Aug 18 2020)

#### 🐾 Patch

- Additional tests [#37](https://github.com/gisat-panther/ptr-state/pull/37) ([@nenadalm](https://github.com/nenadalm) [@vlach1989](https://github.com/vlach1989))

#### Authors: 2

- Miloslav Nenadál ([@nenadalm](https://github.com/nenadalm))
- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v1.5.3 (Tue Aug 18 2020)

#### 🐾 Patch

- Bump elliptic from 6.5.2 to 6.5.3 [#42](https://github.com/gisat-panther/ptr-state/pull/42) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# v1.5.2 (Wed Jul 29 2020)

#### 🐾 Patch

- Get WMS layer option from layer confuguration [#41](https://github.com/gisat-panther/ptr-state/pull/41) ([@vdubr](https://github.com/vdubr))

#### Authors: 1

- Vojtěch Dubrovský ([@vdubr](https://github.com/vdubr))

---

# v1.5.1 (Fri Jul 24 2020)

#### 🐾 Patch

- Add common actions tests [#27](https://github.com/gisat-panther/ptr-state/pull/27) ([@nenadalm](https://github.com/nenadalm) [@tmdmc](https://github.com/tmdmc) [@vlach1989](https://github.com/vlach1989))

#### Authors: 3

- [@tmdmc](https://github.com/tmdmc)
- Miloslav Nenadál ([@nenadalm](https://github.com/nenadalm))
- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v1.5.0 (Thu Jul 23 2020)

#### 🚀 Enhancement

- Fix/nav list and maps [#25](https://github.com/gisat-panther/ptr-state/pull/25) ([@vlach1989](https://github.com/vlach1989))

#### Authors: 1

- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v1.4.18 (Tue Jul 21 2020)

#### 🐾 Patch

- Selections - enable to add data from view [#40](https://github.com/gisat-panther/ptr-state/pull/40) ([@vlach1989](https://github.com/vlach1989))

#### Authors: 1

- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v1.4.17 (Tue Jul 21 2020)

#### 🐾 Patch

- Bump lodash from 4.17.15 to 4.17.19 [#39](https://github.com/gisat-panther/ptr-state/pull/39) ([@dependabot[bot]](https://github.com/dependabot[bot]))

#### Authors: 1

- [@dependabot[bot]](https://github.com/dependabot[bot])

---

# v1.4.16 (Fri Jul 17 2020)

#### 🐾 Patch

- Maps reducers - add layer - do not use setMap helper [#38](https://github.com/gisat-panther/ptr-state/pull/38) ([@vlach1989](https://github.com/vlach1989))

#### Authors: 1

- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v1.4.15 (Wed Jul 15 2020)

#### 🐾 Patch

- maps - set map set layers [#36](https://github.com/gisat-panther/ptr-state/pull/36) ([@vlach1989](https://github.com/vlach1989) [@tmdmc](https://github.com/tmdmc))

#### Authors: 2

- [@tmdmc](https://github.com/tmdmc)
- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v1.4.14 (Wed Jul 15 2020)

#### 🐾 Patch

- Fix release [#35](https://github.com/gisat-panther/ptr-state/pull/35) ([@nenadalm](https://github.com/nenadalm))

#### Authors: 1

- Miloslav Nenadál ([@nenadalm](https://github.com/nenadalm))

---

# v1.4.13 (Tue Jul 14 2020)

#### 🐾 Patch

- Fix/caching [#34](https://github.com/gisat-panther/ptr-state/pull/34) ([@vlach1989](https://github.com/vlach1989))
- Workflows: more names [#33](https://github.com/gisat-panther/ptr-state/pull/33) ([@tmdmc](https://github.com/tmdmc))

#### Authors: 2

- [@tmdmc](https://github.com/tmdmc)
- Pavel Vlach ([@vlach1989](https://github.com/vlach1989))

---

# v1.4.12 (Thu Jul 09 2020)

#### 🐾 Patch

- Add auto to make automatic releases [#32](https://github.com/gisat-panther/ptr-state/pull/32) ([@nenadalm](https://github.com/nenadalm))

#### Authors: 1

- Miloslav Nenadál ([@nenadalm](https://github.com/nenadalm))
