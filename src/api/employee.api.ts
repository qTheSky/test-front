import {instance} from "./axios-instance";
import {IEmployee} from "../features/employees/types/employee.interface";

export const employeeAPI = {
    getEmployees() {
        return instance.get<IEmployee[]>('/employees')
    },
    createEmployee(name: string, educationId: number, positionId: number) {
        return instance.post<IEmployee>('/employees', {name, educationId, positionId})
    },
    updateEmployee(id: number, newName: string, educationId: number, positionId: number) {
        return instance.put<IEmployee>(`/employees/${id}`, {name: newName, educationId, positionId})
    },
    deleteEmployee(id: number) {
        return instance.delete(`/employees/${id}`)
    },
}