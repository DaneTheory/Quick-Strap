import { resolve } from "path";

import PrimaryEsmRequire from "esm";

import { CONSTANTS } from "../CONSTANTS";
import { Utils } from "../Utils";

const { ESM_CONFIGS } = CONSTANTS.VENDOR_DEFAULTS;
const { ThrowError, ResolvePathToManifest } = Utils;

const EsmLoader = (
  projectPath = process.cwd(),
  projectManifest = "",
  opts = null
) => {
  let _opts;
  let resolvedManifest;

  if (typeof projectPath !== "string") {
    ThrowError(
      `"EsmLoader" expected first argument be typeof 'string' and resolve as an absolute path to a directory containing a 'package.json'`,
      `typeof ${typeof projectPath}`
    );
  }

  if (typeof projectManifest !== "string") {
    ThrowError(
      `"EsmLoader" expected second argument be typeof 'string' and resolve as your project's manifest file (i.e. 'package.json')`,
      `typeof ${typeof projectManifest}`
    );
  }

  if (opts === null) opts = ESM_CONFIGS;

  if (
    typeof opts !== "object" ||
    Array.isArray(opts) ||
    Object.keys(opts).length === 0
  ) {
    let returnVal;

    if (Array.isArray(opts)) returnVal = "array";
    if (typeof opts !== "object") returnVal = typeof opts;
    if (Object.keys(opts).length === 0)
      returnVal = `
  Expected ${Object.keys(ESM_CONFIGS)} options
  Recieved ${Object.keys(opts).length} options

    Valid esm options are:
    ${Object.keys(ESM_CONFIGS)}
  `;
    ThrowError(
      `Expected third argument to be an "object" containing valid config options for ESM module.`,
      returnVal
    );
  }

  Object.keys(opts).map((opt) => {
    if (!Object.keys(ESM_CONFIGS).includes(opt)) {
      let msg = `Expected valid ESM config options be given. Found invalid config: ${opt}`;
      throw new Error(msg);
    }
  });

  _opts = { ...ESM_CONFIGS, ...opts };

  resolvedManifest = ResolvePathToManifest(projectPath, projectManifest);
  const { fullPathToManifest } = resolvedManifest;

  let pkg = require(fullPathToManifest);

  if (!pkg.main) {
    ThrowError(
      `ESM requires a project manifest contain a "main" and "module" field be given.`,
      `No "main" field found using manifest located at: ${fullPathToManifest}`
    );
  }

  if (!pkg.module) {
    ThrowError(
      `ESM requires a project manifest contain a "main" and "module" field be given.
  No "module" field found using manifest located at: ${fullPathToManifest}`,
      `No "module" field found using manifest located at: ${fullPathToManifest}`
    );
  }

  let mainModule = resolve(pkg.module);

  require = PrimaryEsmRequire(module, _opts);

  return {
    topLevelExports: require(mainModule),
  };
};

export { EsmLoader };
