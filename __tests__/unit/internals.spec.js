import { internals } from '../../src/internals'

describe(`Unit Test: internals - [useLoader]`, () => {

  describe(`General - (Top level exports)`, () => {
    it(`Will be on Object`, () => {
      expect(typeof internals === 'object').toBe(true)
    })

    it(`Will not be null`, () => {
      expect(internals !== null).toBe(true)
    })

    it(`Will contain key "useLoader"`, () => {
      const { useLoader } = internals
      expect(useLoader).toBeTruthy()
    })
  })

  describe(`Export: useLoader`, () => {
    const { useLoader } = internals

    it(`Will be typeof 'function'`, () => {
      expect(typeof useLoader === 'function').toBe(true)
    })

    it(`To throw Error if first argument is not typeof 'string'`, () => {
      expect(() => useLoader({})).toThrow()
    })

    it(`To throw Error if first argument is not a valid loader name`, () => {
      expect(() => useLoader('notAValidLoaderName')).toThrow()
    })

    it(`To throw Error if second argument is not typeof 'boolean'`, () => {
      expect(() => useLoader('esm', 'false')).toThrow()
    })

    it(`To return an Array if provided a valid loader name`, () => {
      expect(useLoader('esm')).toBeTruthy()

      const [loader] = useLoader('esm')

      expect(loader).toBeTruthy()

      const [rawLoader, rawOpts] = useLoader('esm', false)

      expect(rawLoader).toBeTruthy()
      expect(rawOpts).toBeTruthy()
    })

  })

})
