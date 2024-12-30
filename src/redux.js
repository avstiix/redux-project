/**
 * A simple Redux implementation
 * @param {Function} reducer - The reducer function
 * @param {*} initialState - The initial state
 * @returns {Object} - Store object with getState, dispatch, and subscribe methods
 */
function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  // Get the current state
  function getState() {
    return state;
  }

  // Dispatch an action to modify the state
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
    return action;
  }

  // Subscribe to state changes
  function subscribe(listener) {
    listeners.push(listener);
    // Return unsubscribe function
    return function unsubscribe() {
      listeners = listeners.filter(l => l !== listener);
    };
  }

  // Initialize store with default state
  dispatch({ type: '@@redux/INIT' });

  return {
    getState,
    dispatch,
    subscribe
  };
}

// Example reducer
function combineReducers(reducers) {
  return function combination(state = {}, action) {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
}

// Middleware implementation
function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, initialState) => {
    const store = createStore(reducer, initialState);
    let dispatch = store.dispatch;

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };

    const chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = chain.reduce((a, b) => b(a))(store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}

export { createStore, combineReducers, applyMiddleware }; 