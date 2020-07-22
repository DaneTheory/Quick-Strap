import { CONSTANTS } from "../../CONSTANTS";
import { Utils } from "../../Utils";
import { Loaders } from "../../Loaders";

const { GLOBAL_DEFAULTS, VENDOR_DEFAULTS, VALID_LOADER_NAMES } = CONSTANTS;
const { MANIFEST_FILE_NAME } = GLOBAL_DEFAULTS;

const { ThrowError } = Utils;

const useLoader = (
  moduleName = "",
  useDefaults = true,
  opts = {
    projectPath: process.cwd(),
    projectManifest: MANIFEST_FILE_NAME,
    defaultConfigs: VENDOR_DEFAULTS,
    rawLoaders: Loaders,
  }
) => {
  let _loader;
  let _loaderArgs;

  if (!moduleName) {
    ThrowError(
      `The "useLoader" method requires a value be given for the first argument. Value should be typeof string and match a valid loader name. Current valid loaders names are ${VALID_LOADER_NAMES}.`
    );
  }

  if (!VALID_LOADER_NAMES.includes(moduleName)) {
    ThrowError(
      `The "useLoader" method requires a value be given for the first argument. Value should be typeof string and match a valid loader name. Current valid loaders names are ${VALID_LOADER_NAMES}.`,
      `${moduleName} is not a valid loader name`
    );
  }

  const { projectPath, projectManifest, defaultConfigs, rawLoaders } = opts;

  const { ESM_CONFIGS } = defaultConfigs;
  const { EsmLoader } = rawLoaders;

  if (VALID_LOADER_NAMES.includes(moduleName)) {
    if (typeof useDefaults !== "boolean") {
      ThrowError(
        `The "useLoader" method expects a second argument to be typof 'boolean' and indicates whether or not to export a given loader with default configs enabled. If false, the raw loader and it's corresponding default configs are both available exports of "useLoader" to customize to your needs.`,
        `typeof ${typeof useDefaults}`
      );
    } else {
      switch (useDefaults) {
        case true: {
          switch (moduleName) {
            case VALID_LOADER_NAMES[0]: {
              _loader = EsmLoader(projectPath, projectManifest, {
                ...ESM_CONFIGS,
              });
              _loaderArgs = null;
              break;
            }
          }
          break;
        }
        case false: {
          switch (moduleName) {
            case VALID_LOADER_NAMES[0]: {
              _loader = EsmLoader;
              _loaderArgs = {
                projectPath: projectPath,
                projectManifest: projectManifest,
                defaultConfigs: { ...ESM_CONFIGS },
              };
              break;
            }
          }
          break;
        }
      }
    }
  }

  if (_loaderArgs === null) {
    return [_loader];
  } else {
    return [_loader, _loaderArgs];
  }
};

export { useLoader };
