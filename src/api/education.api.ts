import {instance} from "./axios-instance";
import {IEducation} from "../shared/types/education.interface";

export const educationAPI = {
    getEducations() {
        return instance.get<IEducation[]>('/educations')
    },
    createEducation(title: string) {
        return instance.post<IEducation>('/educations', {title})
    },
    updateEducation(id: number, newTitle: string) {
        return instance.put<IEducation>(`/educations/${id}`, {title: newTitle})
    },
    deleteEducation(id: number) {
        return instance.delete(`/educations/${id}`)
    },
}