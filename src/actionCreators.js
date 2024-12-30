// Action Creators utility functions
const createAction = (type) => (payload) => ({
  type,
  payload
});

// Action Creator with prepared payload
const createActionWithPrep = (type, prepareAction) => {
  function actionCreator(...args) {
    const prepared = prepareAction(...args);
    return {
      type,
      ...prepared
    };
  }
  actionCreator.type = type;
  return actionCreator;
};

// Create multiple actions at once
const createActions = (actionsMap) => {
  return Object.keys(actionsMap).reduce((actions, type) => {
    actions[type] = createAction(type);
    return actions;
  }, {});
};

export { createAction, createActionWithPrep, createActions }; 