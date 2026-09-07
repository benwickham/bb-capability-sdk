// src/host-contract.ts
function experimental_defineHostEntry(args) {
  return {
    experimental_apiVersion: 1,
    contract: args.contract,
    handlers: args.handlers,
    ...args.experimental_signals === void 0 ? {} : { experimental_signals: args.experimental_signals },
    ...args.dispose === void 0 ? {} : { dispose: args.dispose }
  };
}
export {
  experimental_defineHostEntry
};
