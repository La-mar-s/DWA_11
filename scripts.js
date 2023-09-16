function createStore(reducer) {
  let state = 0;
  const listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listeners) => listeners(state));
  };

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}

function counterReducer(state = 0, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "subract":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
}

const store = createStore(counterReducer);

function logStateToConsole(state) {
  console.log(`State:${state}`);
}

store.subscribe(logStateToConsole);

const addAction = { type: "add" };
const subtractAction = { type: "subract" };
const resetAction = { type: "reset" };

console.log("Initial state:", store.getState());
store.dispatch(addAction);
store.dispatch(addAction);
store.dispatch(subtractAction);
store.dispatch(resetAction);
