import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import combReducer from '../reducer/indexReducer';

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch(e) {
    console.log(e)
  }
}

function loadFromLocalStorage() {
  try {
    const deserializedState = localStorage.getItem('state')
    if (deserializedState === null) return undefined
    return JSON.parse(deserializedState)
  } catch(e) {
    console.log(e)
    return undefined
  }
}

const persistedState = loadFromLocalStorage()

const store = createStore(combReducer, persistedState,applyMiddleware(thunk));

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store;
