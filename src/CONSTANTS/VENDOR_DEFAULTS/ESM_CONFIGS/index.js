const ESM_CONFIGS = {
  cjs: {
    cache: true,
    esModule: true,
    extensions: true,
    mutableNamespace: true,
    namedExports: true,
    paths: true,
    vars: true,
    dedefault: true,
    topLevelReturn: true,
  },
  mainFields: ["main"],
  mode: "auto",
  await: true,
  force: false,
  wasm: false,
  cache: false,
  sourceMap: true,
};

export { ESM_CONFIGS };
