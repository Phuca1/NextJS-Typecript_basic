export interface IEventModel {
    id: string,
    title: string,
    description?:string,
    location?: string,
    date?: string,
    image: string,
    isFeatured: boolean,
}