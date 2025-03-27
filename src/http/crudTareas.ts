import axios from "axios"
import { ITareas } from "../types/ITareas"

const URL_LOCAL = "http://localhost:3000/backlog"


export const getAllTareas = async () => {
    try{
        
        const res = await axios.get<{tareas: ITareas[]}>(URL_LOCAL)
        return res.data.tareas
    }catch(error){
        console.log("Hubo un error al traer las tareas en getAllTareas")
    }
}

export const createTarea = async (tareaNueva: ITareas) => {
    try{
        //todavia no termino aca
        //const tareasBd = await getAllTareas()

        const response = await axios.post<ITareas>(URL_LOCAL, tareaNueva)
        return response.data
    }catch(error){
        console.log("Hubo un error al crear la tarea")
    }
}

export const updateTarea = async (tareaActualizada: ITareas) => {
    try{
        const response = await axios.put<ITareas>(URL_LOCAL, tareaActualizada)
        return response.data
    }catch(error){
        console.log("Hubo un error al actualizar la tarea")
    }
}

export const deleteTarea = async (idTarea: string) => {
    try{
        const response = await axios.delete(`${URL_LOCAL}/${idTarea}`)
        return response.data
    }catch(error){
        console.log("Hubo un error al actualizar la tarea")
    }
}
