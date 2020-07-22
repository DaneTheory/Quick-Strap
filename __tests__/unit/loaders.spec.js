import { Loaders } from '../../src/Loaders'

describe(`Unit Test: Loaders - [EsmLoader]`, () => {

  describe(`General - (Top level exports)`, () => {
    it(`Will be on Object`, () => {
      expect(typeof Loaders === 'object').toBe(true)
    })

    it(`Will not be null`, () => {
      expect(Loaders !== null).toBe(true)
    })

    it(`Will contain key "EsmLoader"`, () => {
      const { EsmLoader } = Loaders
      expect(EsmLoader).toBeTruthy()
    })
  })

  describe(`Export: EsmLoader`, () => {
    it(`Will be a Function`, () => {
      const { EsmLoader } = Loaders
      expect(typeof EsmLoader === 'function').toBe(true)
    })

    it(`If run without arguments, will fallback to defaults that yield a return object containing "topLevelExports" key whose value is the result of a require.`, () => {
      const { EsmLoader } = Loaders
      let loader = EsmLoader()
      expect(loader.topLevelExports).toBeTruthy()
    })

    it(`If run with valid, user-defined arguments, will yield a return object containing "topLevelExports" key whose value is the result of a require.`, () => {
      const { EsmLoader } = Loaders
      const { sep } = require('path')
      let fakeProjectRoot = `${process.cwd()}${sep}__tests__${sep}mocks`
      let fakeManifest = `goodManifest.json`
      let fakeOpts = {
        cache: true,
        sourceMap: false,
        mode: 'strict'
      }
      expect(() => EsmLoader(fakeProjectRoot, fakeManifest, fakeOpts).topLevelExports).toBeTruthy()
    })

    it(`If run with only first argument given, will throw Error of value is not typeof 'string'`, () => {
      const { EsmLoader } = Loaders
      expect(() => EsmLoader({})).toThrow()
    })

    it(`If run with second argument given, will throw Error of value is not typeof 'string'`, () => {
      const { EsmLoader } = Loaders
      expect(() => EsmLoader(process.cwd(), {})).toThrow()
    })

    it(`If run with third argument given, will throw Error of value is not typeof 'object'`, () => {
      const { EsmLoader } = Loaders
      expect(() => EsmLoader(process.cwd(), 'package.json', false)).toThrow()
    })

    it(`Providing a config option to ESM that's invalid will throw an Error`, () => {
      const { EsmLoader } = Loaders
      const opts = {
        invalid: 'options'
      }
      expect(() => EsmLoader(process.cwd(), 'package.json', opts)).toThrow()
    })

    it(`Not including a 'main' field in project manifest will cause "EsmLoader" to throw an Error`, () => {
      const { EsmLoader } = Loaders
      const { sep } = require('path')
      let fakeProjectRoot = `${process.cwd()}${sep}__tests__${sep}mocks`
      let fakeManifest = `badManifest.json`
      expect(() => EsmLoader(fakeProjectRoot, fakeManifest)).toThrow()
    })

    it(`Not including a 'module' field in project manifest will cause "EsmLoader" to throw an Error`, () => {
      const { EsmLoader } = Loaders
      const { sep } = require('path')
      let fakeProjectRoot = `${process.cwd()}${sep}__tests__${sep}mocks`
      let fakeManifest = `manifest.json`
      expect(() => EsmLoader(fakeProjectRoot, fakeManifest)).toThrow()
    })


    // it(`Will not be null`, () => {
    //   expect(Loaders !== null).toBe(true)
    // })
    //
    // it(`Will contain key "EsmLoader"`, () => {
    //   const { EsmLoader } = Loaders
    //   expect(EsmLoader).toBeTruthy()
    // })
  })

})
