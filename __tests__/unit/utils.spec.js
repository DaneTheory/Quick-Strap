import { Utils } from '../../src/utils'

describe(`Unit Test: Utils - [ResolvePathToManifest, ThrowError]`, () => {

  describe(`General - (Top level exports)`, () => {
    it(`Will be on Object`, () => {
      expect(typeof Utils === 'object').toBe(true)
    })

    it(`Will not be null`, () => {
      expect(Utils !== null).toBe(true)
    })

    it(`Will contain key "ResolvePathToManifest"`, () => {
      const { ResolvePathToManifest } = Utils
      expect(ResolvePathToManifest).toBeTruthy()
    })

    it(`Will contain key "ThrowError"`, () => {
      const { ThrowError } = Utils
      expect(ThrowError).toBeTruthy()
    })

  })

  describe(`Export: ResolvePathToManifest`, () => {
    const { ResolvePathToManifest } = Utils

    it(`Will be types of 'function'`, () => {
      expect(typeof ResolvePathToManifest === 'function').toBe(true)
    })

    it(`If run without any arguments, will yield an object as the return value that is not an Error`, () => {
      expect(() => ResolvePathToManifest()).toBeTruthy()
    })

    it(`If run using user-defined arguments, yields object on return and is not an Error`, () => {
      const { sep } = require('path')
      let fakeProjectRoot = `${process.cwd()}${sep}__tests__${sep}mocks`
      let fakeManifest = `goodManifest.json`
      expect(() => ResolvePathToManifest(fakeProjectRoot, fakeManifest)).toBeTruthy()
    })

    it(`On successful invokation, will yield an object as the return value that is not an Error`, () => {
      let resPath = ResolvePathToManifest()
      expect(typeof resPath === 'object').toBe(true)
    })

    it(`On successful invokation, will return an object with keys "manifestBasePath", "manifestFileName", "manifestParentDirectory", "fullPathToManifest"`, () => {
      const {
        manifestBasePath,
        manifestFileName,
        manifestParentDirectory,
        fullPathToManifest
      } = ResolvePathToManifest()
      expect(manifestBasePath).toBeTruthy()
      expect(manifestFileName).toBeTruthy()
      expect(manifestParentDirectory).toBeTruthy()
      expect(fullPathToManifest).toBeTruthy()
    })

    it(`Will throw Error if first argument is not typeof 'string'`, () => {
      expect(() => ResolvePathToManifest({})).toThrow()
    })

    it(`Will throw Error if second argument is not typeof 'string'`, () => {
      const { sep } = require('path')
      let fakeProjectRoot = `${process.cwd()}${sep}__tests__${sep}mocks`
      expect(() => ResolvePathToManifest(fakeProjectRoot, {})).toThrow()
    })

    it(`Will throw Error if first argument is not resolveable as path to an existing Directory`, () => {
      const { sep } = require('path')
      let fakeDirectoryPathThatDoesNotExist = `${process.cwd()}${sep}__tests__${sep}foobar`
      expect(() => ResolvePathToManifest(fakeDirectoryPathThatDoesNotExist)).toThrow()
    })

    it(`Will throw Error if second argument if not resolveable as file found at existing given path`, () => {
      const { sep } = require('path')
      let fakeProjectRoot = `${process.cwd()}${sep}__tests__${sep}mocks`
      expect(() => ResolvePathToManifest(fakeProjectRoot, 'nonExistentManifest.json')).toThrow()
    })

  })

  describe(`Export: ThrowError`, () => {
    const { ThrowError } = Utils

    it(`Will be typeof 'function'`, () => {
      expect(typeof ThrowError === 'function').toBe(true)
    })

    it(`Will throw an Error (failing) if the first argument is not typeof 'string'`, () => {
      expect(() => ThrowError({})).toThrow()
    })

    it(`If provided no arguments, will throw the default Error successfully.`, () => {
      expect(() => ThrowError()).toThrow()
    })

    it(`If provided a single argument with value that is typeof 'string', will throw the Error successfully.`, () => {
      expect(() => ThrowError('An Error oh no!')).toThrow()
    })

    it(`If provided two arguments, first as typeof 'string', second as ny type, will throw the Error successfully.`, () => {
      expect(() => ThrowError('An Error oh no!', {here: 'isWhy'})).toThrow()
    })

  })

})
