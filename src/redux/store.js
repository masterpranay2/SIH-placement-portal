import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import { persistedReducer } from './reducers/rootReducer'

// const logger = createLogger()

export const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(logger)
})

export const persistor = persistStore(store)