import { createStore, applyMiddleware } from './redux';
import { createAction, createActions } from './actionCreators';
import { createSelector } from './selectors';
import { persistState, devTools } from './enhancers';
import { logger, thunk } from './middleware';

// Action Creators
const increment = createAction('INCREMENT');
const decrement = createAction('DECREMENT');
const addTodo = createAction('ADD_TODO');

// Create multiple actions at once
const todoActions = createActions({
  'TOGGLE_TODO': null,
  'CLEAR_TODOS': null,
  'SET_FILTER': null
});

// Selectors
const getTodos = state => state.todos;
const getFilter = state => state.filter;

const getFilteredTodos = createSelector(
  getTodos,
  getFilter,
  (todos, filter) => {
    switch (filter) {
      case 'COMPLETED':
        return todos.filter(todo => todo.completed);
      case 'ACTIVE':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }
);

// Create store with enhancers
const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk),
  persistState('my-app-state'),
  devTools
);

// Usage example
store.dispatch(increment());
store.dispatch(addTodo({ text: 'Learn Redux', completed: false }));
store.dispatch(todoActions.TOGGLE_TODO(0));

// Get filtered todos
const filteredTodos = getFilteredTodos(store.getState()); 