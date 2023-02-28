import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {appActions} from "../shared/commonActions/app";
import {employeeAPI} from "../api/employee.api";
import {educationAPI} from "../api/education.api";
import {positionsAPI} from "../api/positions.api";
import {IEmployee} from "../features/employees/types/employee.interface";
import {IEducation} from "../shared/types/education.interface";
import {IPosition} from "../shared/types/position.interface";
import {handleErrors} from "../shared/functions/error-utils";

export const initializeApp = createAsyncThunk<{ employees: IEmployee[], educations: IEducation[], positions: IPosition[] }, void>
('app/initializeApp', async (_, thunkAPI) => {
    thunkAPI.dispatch(appActions.setIsLoading(true))
    try {
        const [employees, educations, positions] = await
            Promise.all([employeeAPI.getEmployees(), educationAPI.getEducations(), positionsAPI.getPositions()])
        return {employees: employees.data, educations: educations.data, positions: positions.data}
    } catch (e) {
        return handleErrors(e, thunkAPI)
    } finally {
        thunkAPI.dispatch(appActions.setIsLoading(false))
    }
})

export const slice = createSlice({
    name: 'app',
    initialState: {
        isInitialized: false,
        isLoading: true,
        error: '',
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.isInitialized = true
            })
            .addCase(initializeApp.rejected, (state) => {
                state.isInitialized = true
            })
            .addCase(appActions.setIsLoading, (state, action) => {
                state.isLoading = action.payload
            })
            .addCase(appActions.setAppError, (state, action) => {
                state.error = action.payload
            })
    }
})


export const appReducer = slice.reducer


