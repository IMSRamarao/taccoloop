import {applyMiddleware, createStore, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from '../reducer/index';
import AsyncStorage from '@react-native-community/async-storage';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {install} from 'redux-loop';

// Middleware: Redux Persist Config
const persistConfig = {
  // Root?
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['ShowTacosComponent'],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
};

const enhancer = compose(applyMiddleware(thunk, createLogger()), install());

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(rootReducer, enhancer);

let persistor = persistStore(store);

export {store, persistor};
