import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './reducer/rootReducer';

const persistConfig = {
  key: 'root',
  storage
}

const persisted = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(
  persisted,
  composeWithDevTools()
)

export default store;