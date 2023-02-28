import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handleErrors} from "../../../shared/functions/error-utils";
import {employeeAPI} from "../../../api/employee.api";
import {appActions} from "../../../shared/commonActions/app";
import {IEmployee} from "../types/employee.interface";
import {IUpdateEmployee} from "../types/update-employee.interface";
import {AppRootStateType} from "../../../app/store";
import {initializeApp} from "../../../app/app.reducer";


export const createNewEmployee = createAsyncThunk<IEmployee, { name: string, educationId: number, positionId: number }>('employees/createNewEmployee',
    async (params, thunkAPI) => {
        thunkAPI.dispatch(appActions.setIsLoading(true))
        try {
            const {data} = await employeeAPI.createEmployee(params.name, params.educationId, params.positionId)
            return data
        } catch (e) {
            return handleErrors(e, thunkAPI)
        } finally {
            thunkAPI.dispatch(appActions.setIsLoading(false))
        }
    })
export const deleteEmployee = createAsyncThunk<number, number>('employees/deleteEmployee',
    async (employeeId, thunkAPI) => {
        thunkAPI.dispatch(appActions.setIsLoading(true))
        try {
            await employeeAPI.deleteEmployee(employeeId)
            return employeeId
        } catch (e) {
            return handleErrors(e, thunkAPI)
        } finally {
            thunkAPI.dispatch(appActions.setIsLoading(false))
        }
    })
export const updateEmployee = createAsyncThunk<IEmployee, { id: number, updateModel: Partial<IUpdateEmployee> }>('employees/updateEmployee',
    async (params, thunkAPI) => {
        thunkAPI.dispatch(appActions.setIsLoading(true))
        try {
            const state = thunkAPI.getState() as AppRootStateType
            const employee = state.employees.employees.find(e => e.id === params.id)
            if (!employee) {
                throw new Error('Employee not found')
            }
            const apiModel: IUpdateEmployee = {
                name: employee.name,
                educationId: employee.info.education.id,
                positionId: employee.info.position.id,
                ...params.updateModel,
            }
            const {data} = await employeeAPI.updateEmployee(employee.id, apiModel.name, apiModel.educationId, apiModel.positionId)
            return data
        } catch (e) {
            return handleErrors(e, thunkAPI)
        } finally {
            thunkAPI.dispatch(appActions.setIsLoading(false))

        }
    })


const initialState = {
    employees: [] as IEmployee[]
}

export const slice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.employees = action.payload.employees
            })
            .addCase(createNewEmployee.fulfilled, (state, action) => {
                state.employees = [action.payload, ...state.employees,]
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const index = state.employees.findIndex(e => e.id === action.payload.id)
                if (index > -1) {
                    const currentEmployee = state.employees[index]
                    state.employees[index] = {...currentEmployee, ...action.payload}
                }
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                const index = state.employees.findIndex(e => e.id === action.payload)
                if (index > -1) {
                    state.employees.splice(index, 1)
                }
            })
    }
})
export const {} = slice.actions
export const employeesReducer = slice.reducer
