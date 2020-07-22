// eslint-disable-next-line
const { existsSync, statSync, isFile, isDirectory } = require("fs");
// eslint-disable-next-line
const { join, dirname, basename, sep } = require("path");

const { CONSTANTS } = require("../../CONSTANTS");
const { MANIFEST_FILE_NAME } = CONSTANTS.GLOBAL_DEFAULTS;

const ResolvePathToManifest = (basePath = "", manifestFile = "") => {
  if (basePath === "") basePath = process.cwd();
  if (manifestFile === "") manifestFile = MANIFEST_FILE_NAME;

  let dir = basePath;
  let file = manifestFile;

  let pathToManifest;

  if (typeof dir !== "string") {
    let msg = `Expected first argument to be typeof string. Returned ${typeof dir}`;
    throw new Error(msg);
  }

  if (typeof file !== "string") {
    let msg = `Expected second argument to be typeof string. Returned ${typeof file}`;
    throw new Error(msg);
  }

  if (existsSync(dir) !== true) {
    let msg = `Expected first argument to be an existing path to a directory. Returned: ${existsSync(
      dir
    )}`;
    throw new Error(msg);
  }

  if (!statSync(dir).isDirectory()) {
    let msg = `Expected first argument to be an existing path to a directory.`;
    throw new Error(msg);
  }

  pathToManifest = join(dir, file);

  if (!statSync(pathToManifest).isFile()) {
    let msg = `Expected first argument to be an existing path to a directory, the second argument to be a file named ${file}. Returned: ${pathToManifest}`;
    throw new Error(msg);
  }

  if (!existsSync(pathToManifest)) {
    let msg = `Expected first argument and second argument to return an existing path to a directory containing speciffied file. Returned directory path: ${dir}. Returned file name: ${file}. Returned check for if file at directory exists: ${existsSync(
      pathToManifest
    )}`;
    throw new Error(msg);
  }

  return {
    manifestBasePath: dirname(pathToManifest),
    manifestFileName: basename(pathToManifest),
    manifestParentDirectory: dirname(pathToManifest).split(sep).pop(),
    fullPathToManifest: pathToManifest,
  };
};

export { ResolvePathToManifest };
