// Logger middleware
const logger = store => next => action => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next State:', store.getState());
  return result;
};

// Thunk middleware for async actions
const thunk = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return next(action);
};

// Using middleware
import { createStore, applyMiddleware } from './redux';

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk)
); 