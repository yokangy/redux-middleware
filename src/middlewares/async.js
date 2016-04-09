export default function({ dispatch }) {
  return next => action => {
    // if action does not have a payload or .then property, send it on
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // Make sure the action's promise resolves
    action.payload
      .then(function(response) {
        // create a new action with the old type and replace promise with response data
        const newAction = { ...action, payload: response };
        dispatch(newAction);
      });
  }
}