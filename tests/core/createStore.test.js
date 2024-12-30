import { createStore } from '../../src/core/createStore.js';

describe('createStore', () => {
  const initialState = { count: 0 };
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      default:
        return state;
    }
  };

  it('should create a store with the initial state', () => {
    const store = createStore(reducer, initialState);
    expect(store.getState()).toEqual(initialState);
  });

  it('should update state when dispatching an action', () => {
    const store = createStore(reducer, initialState);
    store.dispatch({ type: 'INCREMENT' });
    expect(store.getState().count).toBe(1);
  });

  it('should notify subscribers when state changes', () => {
    const store = createStore(reducer, initialState);
    const listener = jest.fn();
    store.subscribe(listener);
    store.dispatch({ type: 'INCREMENT' });
    expect(listener).toHaveBeenCalledTimes(1);
  });
}); 