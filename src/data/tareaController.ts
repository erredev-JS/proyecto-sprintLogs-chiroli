import axios from "axios"
import { ITareas } from "../types/ITareas"
import { URL_BACKLOG } from "../utils/constantes"
import { putTareaList } from "../http/crudTareas"




export const getAllTareasController = async (): Promise<ITareas[]| undefined> => {
    try{
        
        const res = await axios.get<{tareas: ITareas[]}>(URL_BACKLOG)
        return res.data.tareas
    }catch(error){
        console.log("Hubo un error al traer las tareas en getAllTareas")
    }
}

export const createTareaController = async (tareaNueva: ITareas) => {
    try{
    
        const tareasBd = await getAllTareasController()

        if(tareasBd){
            await putTareaList([...tareasBd, tareaNueva])
        }else{
            await putTareaList([tareaNueva])
        }
        
    }catch(error){
        console.log("Hubo un error al crear la tarea", error)
    }
}

export const updateTareaController = async (tareaActualizada: ITareas) => {
    try{
    
        const tareasBd = await getAllTareasController()

        if(tareasBd){
            const result = tareasBd.map((tareaBd) => 
                tareaBd.id === tareaActualizada.id 
                ? {...tareaBd, ...tareaActualizada}
                : tareaBd
            )

            await putTareaList(result)
        }
        
    }catch(error){
        console.log("Hubo un error al actualizar la tarea", error)
    }
}

export const deleteTareaController = async (idTareaAEliminar: string) => {
    try{
        const tareasBd = await getAllTareasController()

        if(tareasBd){
            const result = tareasBd.filter((tareaBd) => tareaBd.id !== idTareaAEliminar)
            
            await putTareaList(result)
        }

    }catch(error){
        console.log("Hubo un error al eliminar la tarea", error)
    }
}
