const { createStore, applyMiddleware } = require('../../src/redux');
const { thunk } = require('../../src/middleware/thunk');

describe('thunk middleware', () => {
  it('should handle async actions', async () => {
    const initialState = { data: null };
    const reducer = (state = initialState, action) => {
      switch (action.type) {
        case 'SET_DATA':
          return { ...state, data: action.payload };
        default:
          return state;
      }
    };

    const store = createStore(
      reducer,
      applyMiddleware(thunk)
    );

    const asyncAction = () => async (dispatch) => {
      const data = 'test data';
      dispatch({ type: 'SET_DATA', payload: data });
    };

    await store.dispatch(asyncAction());
    expect(store.getState().data).toBe('test data');
  });
}); 