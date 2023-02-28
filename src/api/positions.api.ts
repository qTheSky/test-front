import {instance} from "./axios-instance";
import {IPosition} from "../shared/types/position.interface";

export const positionsAPI = {
    getPositions() {
        return instance.get<IPosition[]>('/positions')
    },
    createPosition(title: string) {
        return instance.post<IPosition>('/positions', {title})
    },
    updatePosition(id: number, newTitle: string) {
        return instance.put<IPosition>(`/positions/${id}`, {title: newTitle})
    },
    deletePosition(id: number) {
        return instance.delete(`/positions/${id}`)
    },
}