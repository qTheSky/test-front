export interface IEmployee {
    id: number
    name: string
    info: {
        education: { id: number, title: string },
        position: { id: number, title: string },
    }
}