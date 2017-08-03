function wrapFunction(fn, that, onError = () => ({})) {
  return function(...args) {
    try {
      let result = fn.apply(that, args);
      return result;
      return value;
    } catch (error) {
      onError(error);
    }
  };
}

function getValue(target, name, onError = () => ({})) {
  try {
    return target[name];
  } catch (error) {
    onError(error);
    return undefined;
  }
}

function setValue(target, name, value, onError = () => ({})) {
  try {
    target[name] = value;
  } catch (error) {
    onError(error);
  }
}

function nailCorpseInUprightPosition(options = {}) {
  if (!options.onError && !options.liveDangerously) {
    console.warn("nailCorpseInUprightPosition::No Error Handler Set - Living Dangerously");
  }
  return function decorator(target) {
    const handler = {
      get(target, name, receiver) {
        const value = getValue(target, name, options.onError);
        return typeof value === "function" ? 
          wrapFunction(value, target, options.onError) :
          value;
      },

      set(target, name, value, receiver) {
        setValue(target, name, value, options.onError);
      }
    };

    return new Proxy(target, handler);
  };
}

module.exports = nailCorpseInUprightPosition;
