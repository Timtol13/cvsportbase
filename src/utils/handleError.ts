import { Dispatch } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

import { setAppSnackbarValue } from '../store/bll/appReducer'
export const handleError = (error: unknown, dispatch: Dispatch): void => {
  const err = error as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message

    dispatch(setAppSnackbarValue({ type: 'error', message: error }))
    console.log('err', err)
    return
  }
  dispatch(
    setAppSnackbarValue({
      type: 'error',
      message: `Native error ${err.message}`,
    })
  )
}
