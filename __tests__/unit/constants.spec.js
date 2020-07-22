import { CONSTANTS } from '../../src/CONSTANTS'

describe(`Unit Test: CONSTANTS - [GLOBAL_DEFAULTS, VENDOR_DEFAULTS, VALID_LOADER_NAMES]`, () => {

  describe(`General - (Top level exports)`, () => {
    it(`Will be on Object`, () => {
      expect(typeof CONSTANTS === 'object').toBe(true)
    })

    it(`Will not be null`, () => {
      expect(CONSTANTS !== null).toBe(true)
    })

    it(`Will contain key "GLOBAL_DEFAULTS"`, () => {
      const { GLOBAL_DEFAULTS } = CONSTANTS
      expect(GLOBAL_DEFAULTS).toBeTruthy()
    })

    it(`Will contain key "VENDOR_DEFAULTS"`, () => {
      const { VENDOR_DEFAULTS } = CONSTANTS
      expect(VENDOR_DEFAULTS).toBeTruthy()
    })

    it(`Will contain key "VALID_LOADER_NAMES"`, () => {
      const { VALID_LOADER_NAMES } = CONSTANTS
      expect(VALID_LOADER_NAMES).toBeTruthy()
    })
  })

  describe(`Export: GLOBAL_DEFAULTS`, () => {
    const { GLOBAL_DEFAULTS } = CONSTANTS

    it(`Will be on Object`, () => {
      expect(typeof GLOBAL_DEFAULTS === 'object').toBe(true)
    })

    it(`Will not be null`, () => {
      expect(GLOBAL_DEFAULTS !== null).toBe(true)
    })

    it(`Will contain key "MANIFEST_FILE_NAME"`, () => {
      const { MANIFEST_FILE_NAME } = GLOBAL_DEFAULTS
      expect(MANIFEST_FILE_NAME).toBeTruthy()
    })

    it(`"MANIFEST_FILE_NAME" key has value that is typeof 'string'`, () => {
      const { MANIFEST_FILE_NAME } = GLOBAL_DEFAULTS
      expect(typeof MANIFEST_FILE_NAME === 'string').toBe(true)
    })

    it(`"MANIFEST_FILE_NAME" key has value of package.json`, () => {
      const { MANIFEST_FILE_NAME } = GLOBAL_DEFAULTS
      expect(MANIFEST_FILE_NAME).toBe('package.json')
    })

  })

  describe(`Export: VENDOR_DEFAULTS`, () => {
    const { VENDOR_DEFAULTS } = CONSTANTS

    it(`Will be on Object`, () => {
      expect(typeof VENDOR_DEFAULTS === 'object').toBe(true)
    })

    it(`Will not be null`, () => {
      expect(VENDOR_DEFAULTS !== null).toBe(true)
    })

    it(`Will contain key "ESM_CONFIGS"`, () => {
      const { ESM_CONFIGS } = VENDOR_DEFAULTS
      expect(ESM_CONFIGS).toBeTruthy()
    })

    it(`"ESM_CONFIGS" key has value that is typeof 'object'`, () => {
      const { ESM_CONFIGS } = VENDOR_DEFAULTS
      expect(typeof ESM_CONFIGS === 'object').toBe(true)
    })

    it(`"ESM_CONFIGS" key has value that is not equal to null`, () => {
      const { ESM_CONFIGS } = VENDOR_DEFAULTS
      expect(ESM_CONFIGS !== null).toBe(true)
    })

    it(`"ESM_CONFIGS" object has keys [cjs, mainFields, mode, await, force, wasm, cache, sourceMap]`, () => {
      const { ESM_CONFIGS } = VENDOR_DEFAULTS
      expect(Object.keys(ESM_CONFIGS)).toEqual(['cjs','mainFields','mode','await','force','wasm','cache','sourceMap'])
    })

    it(`"ESM_CONFIGS" object has key "cjs" is typeof 'object'`, () => {
      const { ESM_CONFIGS } = VENDOR_DEFAULTS
      let vals = Object.entries(ESM_CONFIGS).flat()
      let propIdx = vals.indexOf('cjs')+1
      expect(typeof vals[propIdx] === 'object').toBe(true)
    })

    it(`"ESM_CONFIGS" object has key "mainFields" is typeof 'array'`, () => {
      const { ESM_CONFIGS } = VENDOR_DEFAULTS
      let vals = Object.entries(ESM_CONFIGS).flat()
      let propIdx = vals.indexOf('mainFields')+1
      expect(Array.isArray(vals[propIdx])).toBe(true)
    })

    it(`"ESM_CONFIGS" "mainFields" key is Array composed of only strings`, () => {
      const { ESM_CONFIGS } = VENDOR_DEFAULTS
      let vals = Object.entries(ESM_CONFIGS).flat()
      let propIdx = vals.indexOf('mainFields')+1
      vals[propIdx].filter(val => {
        expect(typeof val === 'string').toBe(true)
      })
    })

    it(`"ESM_CONFIGS" object has key "mode" is typeof 'string'`, () => {
      const { ESM_CONFIGS } = VENDOR_DEFAULTS
      let vals = Object.entries(ESM_CONFIGS).flat()
      let propIdx = vals.indexOf('mode')+1
      expect(typeof vals[propIdx] === 'string').toBe(true)
    })

    it(`"ESM_CONFIGS" object has key "await" is typeof 'boolean'`, () => {
      const { ESM_CONFIGS } = VENDOR_DEFAULTS
      let vals = Object.entries(ESM_CONFIGS).flat()
      let propIdx = vals.indexOf('await')+1
      expect(typeof vals[propIdx] === 'boolean').toBe(true)
    })

    it(`"ESM_CONFIGS" object has key "force" is typeof 'boolean'`, () => {
      const { ESM_CONFIGS } = VENDOR_DEFAULTS
      let vals = Object.entries(ESM_CONFIGS).flat()
      let propIdx = vals.indexOf('force')+1
      expect(typeof vals[propIdx] === 'boolean').toBe(true)
    })

    it(`"ESM_CONFIGS" object has key "wasm" is typeof 'boolean'`, () => {
      const { ESM_CONFIGS } = VENDOR_DEFAULTS
      let vals = Object.entries(ESM_CONFIGS).flat()
      let propIdx = vals.indexOf('wasm')+1
      expect(typeof vals[propIdx] === 'boolean').toBe(true)
    })

    it(`"ESM_CONFIGS" object has key "cache" is typeof 'boolean'`, () => {
      const { ESM_CONFIGS } = VENDOR_DEFAULTS
      let vals = Object.entries(ESM_CONFIGS).flat()
      let propIdx = vals.indexOf('cache')+1
      expect(typeof vals[propIdx] === 'boolean').toBe(true)
    })

    it(`"ESM_CONFIGS" object has key "sourceMap" is typeof 'boolean'`, () => {
      const { ESM_CONFIGS } = VENDOR_DEFAULTS
      let vals = Object.entries(ESM_CONFIGS).flat()
      let propIdx = vals.indexOf('sourceMap')+1
      expect(typeof vals[propIdx] === 'boolean').toBe(true)
    })

  })

  describe(`Export: VALID_LOADER_NAMES`, () => {

    it(`Will be an Array`, () => {
      const { VALID_LOADER_NAMES } = CONSTANTS
      expect(Array.isArray(VALID_LOADER_NAMES)).toBe(true)
    })

    it(`Will have a length of 1`, () => {
      const { VALID_LOADER_NAMES } = CONSTANTS
      expect(VALID_LOADER_NAMES.length).toEqual(1)
    })

    it(`Will contain the string "esm"`, () => {
      const { VALID_LOADER_NAMES } = CONSTANTS
      VALID_LOADER_NAMES.filter(name => {
        expect(name === 'esm').toBe(true)
      })
    })

  })

})
