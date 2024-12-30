// Store enhancer for local storage persistence
const persistState = (key = 'redux-state') => {
  return (createStore) => (reducer, initialState, enhancer) => {
    // Try to load state from localStorage
    let savedState;
    try {
      savedState = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      savedState = undefined;
    }

    const store = createStore(reducer, savedState || initialState, enhancer);

    // Save to localStorage on every state change
    store.subscribe(() => {
      try {
        localStorage.setItem(key, JSON.stringify(store.getState()));
      } catch (e) {
        console.warn('Failed to save state to localStorage:', e);
      }
    });

    return store;
  };
};

// Dev tools enhancer
const devTools = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || ((x) => x);

export { persistState, devTools }; 