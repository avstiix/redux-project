// Memoized selector creator (similar to reselect)
function createSelector(...args) {
  const resultFunc = args.pop();
  const dependencies = args;

  let lastArgs = null;
  let lastResult = null;

  return function selector(state, ...args) {
    const currentArgs = dependencies.map(dep => dep(state, ...args));
    
    if (lastArgs && lastArgs.every((arg, i) => arg === currentArgs[i])) {
      return lastResult;
    }

    lastArgs = currentArgs;
    lastResult = resultFunc(...currentArgs);
    return lastResult;
  };
}

export { createSelector }; 