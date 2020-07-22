// eslint-disable-next-line
const { join, resolve } = require("path");

// eslint-disable-next-line
const { existsSync, isFile, isDirectory, statSync } = require("fs");

const { CONSTANTS } = require("./CONSTANTS");
const { Utils } = require("./Utils");

const { MANIFEST_FILE_NAME } = CONSTANTS.GLOBAL_DEFAULTS;
const { ESM_CONFIGS } = CONSTANTS.VENDOR_DEFAULTS;

const { ThrowError } = Utils;

const requireQuickStrap = (pathToProjectDirectory = process.cwd()) => {
  let _pathToProjectManifest;
  let projectManifest;
  let projectManifestMainModule;
  let projectTopLevelExport;

  if (typeof pathToProjectDirectory !== "string") {
    ThrowError(
      `QuickStrap expects a single argument be given as typeof "string" which then resolves to an existing path to a directory which contains an existing ${MANIFEST_FILE_NAME} file`,
      typeof pathToProjectDirectory
    );
  }

  if (!existsSync(pathToProjectDirectory)) {
    ThrowError(
      `QuickStrap expects a single argument be given as typeof "string" and resolves to an existing path to a directory which contains an existing ${MANIFEST_FILE_NAME} file.`,
      "Path does not exist"
    );
  }

  if (!statSync(pathToProjectDirectory).isDirectory()) {
    ThrowError(
      `QuickStrap expects a single argument be given as typeof "string" and resolves to an existing path to a directory which contains an existing ${MANIFEST_FILE_NAME} file.`,
      `${pathToProjectDirectory} is not a directory`
    );
  }

  _pathToProjectManifest = resolve(pathToProjectDirectory, MANIFEST_FILE_NAME);
  projectManifest = require(_pathToProjectManifest);

  if (!projectManifest.module) {
    ThrowError(
      `QuickStrap relies internally on your project's ${MANIFEST_FILE_NAME} to reliably export properly configured Loaders during your applications runtime. At minimum, your ${MANIFEST_FILE_NAME} should include a "main" and "module" field. "main" should point to your project's primary entry point. "module" should point to the primary export your project makes.`,
      `Could not find "module" field in ${MANIFEST_FILE_NAME}`
    );
  }

  projectManifestMainModule = resolve(projectManifest.module);

  require = require("esm")(module, ESM_CONFIGS);
  projectTopLevelExport = require(projectManifestMainModule);

  const { DEFAULT_OPTIONS, Loaders, useLoader } = projectTopLevelExport;
  const { VENDOR_DEFAULTS } = DEFAULT_OPTIONS;

  return {
    projectPath: resolve(pathToProjectDirectory),
    vendorDefaults: VENDOR_DEFAULTS,
    rawLoaders: Loaders,
    useLoader: (moduleName, useDefaults, opts) =>
      useLoader(moduleName, useDefaults, opts),
  };
};

module.exports.QuickStrap = (dirPath) => requireQuickStrap(dirPath);
