import { CONSTANTS } from "./CONSTANTS";
import { Loaders } from "./Loaders";
import { internals } from "./internals";

const DEFAULT_OPTIONS = {
  ...CONSTANTS,
};

const { useLoader } = internals;

export default {
  DEFAULT_OPTIONS,
  Loaders,
  useLoader,
};
