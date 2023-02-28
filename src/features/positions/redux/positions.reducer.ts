import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handleErrors} from "../../../shared/functions/error-utils";
import {appActions} from "../../../shared/commonActions/app";
import {IPosition} from "../../../shared/types/position.interface";
import {positionsAPI} from "../../../api/positions.api";
import {initializeApp} from "../../../app/app.reducer";


export const updatePosition = createAsyncThunk<IPosition, { id: number, newTitle: string }>('positions/updatePosition',
    async (params, thunkAPI) => {
        thunkAPI.dispatch(appActions.setIsLoading(true))
        try {
            const {data} = await positionsAPI.updatePosition(params.id, params.newTitle)
            return data
        } catch (e) {
            return handleErrors(e, thunkAPI)
        } finally {
            thunkAPI.dispatch(appActions.setIsLoading(false))
        }
    })
export const createPosition = createAsyncThunk<IPosition, { title: string }>('positions/createPosition',
    async ({title}, thunkAPI) => {
        thunkAPI.dispatch(appActions.setIsLoading(true))
        try {
            const {data} = await positionsAPI.createPosition(title)
            return data
        } catch (e) {
            return handleErrors(e, thunkAPI)
        } finally {
            thunkAPI.dispatch(appActions.setIsLoading(false))
        }
    })
export const deletePosition = createAsyncThunk<{ positionId: number }, { positionId: number }>('positions/deletePosition',
    async ({positionId}, thunkAPI) => {
        thunkAPI.dispatch(appActions.setIsLoading(true))
        try {
            await positionsAPI.deletePosition(positionId)
            thunkAPI.dispatch(appActions.setIsLoading(false))
            return {positionId}
        } catch (e) {
            return handleErrors(e, thunkAPI)
        } finally {
            thunkAPI.dispatch(appActions.setIsLoading(false))
        }
    })


const initialState = {
    positions: [] as IPosition[]
}

export const slice = createSlice({
    name: 'positions',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.positions = action.payload.positions
            })
            .addCase(createPosition.fulfilled, (state, action) => {
                state.positions = [action.payload, ...state.positions]
            })
            .addCase(updatePosition.fulfilled, (state, action) => {
                const index = state.positions.findIndex(p => p.id === action.payload.id)
                if (index > -1) {
                    const currentPosition = state.positions[index]
                    state.positions[index] = {...currentPosition, ...action.payload}
                }
            })
            .addCase(deletePosition.fulfilled, (state, action) => {
                const index = state.positions.findIndex(p => p.id === action.payload.positionId)
                if (index > -1) {
                    state.positions.splice(index, 1)
                }
            })
    }
})
export const {} = slice.actions
export const positionsReducer = slice.reducer
