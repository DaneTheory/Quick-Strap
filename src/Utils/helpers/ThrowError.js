import dedent from "dedent";

const ThrowError = (errMsg = "An Error occurred", errCulprit) => {
  let _msg;

  if (typeof errMsg !== "string") {
    let msg = dedent`"ThrowError" expects first argument to be typeof 'string'. A second argument can be optionally provided and should represent the reason for why an error was thrown (i.e. the return value that broke things)`;
    throw new Error(msg);
  }

  if (errCulprit) {
    _msg = dedent`
    ${errMsg}
    Returned: ${errCulprit}`;
  } else {
    _msg = dedent`
    ${errMsg}`;
  }

  throw new Error(_msg);
};

export { ThrowError };
