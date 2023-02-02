import { AlertColor } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { requestStatus } from '../../enums/requestStatus'

const slice = createSlice({
  name: 'app',
  initialState: {
    snackbarValue: {} as SnackbarType,
    snackbarStatus: false,
    statusApp: requestStatus.IDLE,
  },
  reducers: {
    setAppSnackbarValue(
      state,
      action: PayloadAction<{ type: AlertColor | undefined; message: string | null }>
    ) {
      state.snackbarValue = action.payload
    },
    setSnackbarStatus(state, action: PayloadAction<boolean>) {
      state.snackbarStatus = action.payload
    },
    setAppStatus(state, action: PayloadAction<requestStatus>) {
      state.statusApp = action.payload
    },
  },
})

export const appReducer = slice.reducer
export const { setAppSnackbarValue, setAppStatus, setSnackbarStatus } = slice.actions

export type SnackbarType = {
  type: AlertColor | undefined
  message: string | null
}
