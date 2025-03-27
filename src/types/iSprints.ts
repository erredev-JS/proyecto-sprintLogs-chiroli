import { ITarea } from "./iTareas"

export interface ISprint {
    id: string,
    fechaInicio: string,
    fechaCierre: string,
    nombre: string
    tareas: ITarea[]
}