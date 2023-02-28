import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IEducation} from "../../../shared/types/education.interface";
import {initializeApp} from "../../../app/app.reducer";
import {IPosition} from "../../../shared/types/position.interface";
import {appActions} from "../../../shared/commonActions/app";
import {handleErrors} from "../../../shared/functions/error-utils";
import {educationAPI} from "../../../api/education.api";

export const createEducation = createAsyncThunk<IPosition, { title: string }>('positions/createEducation',
    async ({title}, thunkAPI) => {
        thunkAPI.dispatch(appActions.setIsLoading(true))
        try {
            const {data} = await educationAPI.createEducation(title)
            return data
        } catch (e) {
            return handleErrors(e, thunkAPI)
        } finally {
            thunkAPI.dispatch(appActions.setIsLoading(false))
        }
    })

export const updateEducation = createAsyncThunk<IEducation, { id: number, newTitle: string }>('positions/updateEducation',
    async (params, thunkAPI) => {
        thunkAPI.dispatch(appActions.setIsLoading(true))
        try {
            const {data} = await educationAPI.updateEducation(params.id, params.newTitle)
            return data
        } catch (e) {
            return handleErrors(e, thunkAPI)
        } finally {
            thunkAPI.dispatch(appActions.setIsLoading(false))
        }
    })

export const deleteEducation = createAsyncThunk<{ educationId: number }, { educationId: number }>('positions/deleteEducation',
    async ({educationId}, thunkAPI) => {
        thunkAPI.dispatch(appActions.setIsLoading(true))
        try {
            await educationAPI.deleteEducation(educationId)
            thunkAPI.dispatch(appActions.setIsLoading(false))
            return {educationId}
        } catch (e) {
            return handleErrors(e, thunkAPI)
        }
    })

const initialState = {
    educations: [] as IEducation[]
}

export const slice = createSlice({
    name: 'educations',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.educations = action.payload.educations
            })
            .addCase(createEducation.fulfilled, (state, action) => {
                state.educations = [action.payload, ...state.educations]
            })
            .addCase(updateEducation.fulfilled, (state, action) => {
                const index = state.educations.findIndex(p => p.id === action.payload.id)
                if (index > -1) {
                    const currentPosition = state.educations[index]
                    state.educations[index] = {...currentPosition, ...action.payload}
                }
            })
            .addCase(deleteEducation.fulfilled, (state, action) => {
                const index = state.educations.findIndex(p => p.id === action.payload.educationId)
                if (index > -1) {
                    state.educations.splice(index, 1)
                }
            })

    }
})
export const {} = slice.actions
export const educationsReducer = slice.reducer
