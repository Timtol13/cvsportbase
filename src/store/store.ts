import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { appReducer } from './bll/appReducer'
import { authReducer } from './bll/authReducer'

import { loadState, saveState } from '../utils/sessionStorage-utils'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware),
  preloadedState: loadState(),
})

store.subscribe(() => {
  saveState({ auth: store.getState().auth })
})

export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  ActionsType
>

export type AppDispatch = ThunkDispatch<AppStateType, unknown, ActionsType>

export type ActionsType = any
export type AppStateType = ReturnType<typeof rootReducer>
export type AppStoreType = typeof store
// @ts-ignore
window.store = store // for dev
