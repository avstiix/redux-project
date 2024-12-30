import { createSelector } from '../../src/utils/selectors';

describe('createSelector', () => {
  const state = {
    todos: [
      { id: 1, text: 'Test 1', completed: false },
      { id: 2, text: 'Test 2', completed: true }
    ],
    filter: 'COMPLETED'
  };

  const getTodos = state => state.todos;
  const getFilter = state => state.filter;

  it('should create a memoized selector', () => {
    const getFilteredTodos = createSelector(
      getTodos,
      getFilter,
      (todos, filter) => {
        return filter === 'COMPLETED' 
          ? todos.filter(todo => todo.completed)
          : todos;
      }
    );

    const result = getFilteredTodos(state);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it('should memoize results', () => {
    const selector = jest.fn((x) => x);
    const memoizedSelector = createSelector(
      state => state.todos,
      selector
    );

    memoizedSelector(state);
    memoizedSelector(state);
    
    expect(selector).toHaveBeenCalledTimes(1);
  });
}); 