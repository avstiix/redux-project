import { createStore, combineReducers } from './redux';

// Counter reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

// Todos reducer
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'REMOVE_TODO':
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer
});

// Create store
const store = createStore(rootReducer);

// Subscribe to changes
store.subscribe(() => {
  console.log('State updated:', store.getState());
});

// Dispatch actions
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'ADD_TODO', payload: 'Learn Redux' }); 