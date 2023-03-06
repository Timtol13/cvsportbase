import {createAsyncThunk} from '@reduxjs/toolkit'

import {requestStatus} from '../../enums/requestStatus'
import {handleError} from '../../utils/handleError'

import {setAppStatus} from './appReducer'

import {putAPI} from '../../api/api'
import {AdvancePutFormType} from "../../api/RequestType";

export const advancePutTC = createAsyncThunk(
    'advancePut',
    async (params: {role:string, data: AdvancePutFormType, user: string}, { dispatch }) => {
        dispatch(setAppStatus(requestStatus.LOADING))
        try {
            console.log(params.data)
            const res = await putAPI.putAdvance(params.role, params.data, params.user)
            dispatch(setAppStatus(requestStatus.SUCCEEDED))
        } catch (err) {
            handleError(err, dispatch)
            dispatch(setAppStatus(requestStatus.FAILED))
        }
    }
)

export const putPhotoTC = createAsyncThunk(
    'putPhoto',
    async(params: {photo: any, user: any}, {dispatch}) => {
        dispatch(setAppStatus(requestStatus.LOADING))
        try{
            const res = await putAPI.putPhoto({photo: params.photo, user: params.user})
            dispatch(setAppStatus(requestStatus.SUCCEEDED, ))
        } catch (err){
            handleError(err, dispatch)
            dispatch(setAppStatus(requestStatus.FAILED))
        }
    }
)