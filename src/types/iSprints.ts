import { ITareas } from "./ITareas"


export interface ISprint {
    id: string ,
    fechaInicio: string,
    fechaCierre: string,
    nombre: string
    tareas: ITareas[]
}