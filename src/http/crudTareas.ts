import axios from "axios"
import { ITareas } from "../types/ITareas"
import { ITareaList } from "../types/ITareaList"
import { URL_BACKLOG } from "../utils/constantes"


export const putTareaList = async (tareas: ITareas[]) => {

    

    try{
        const response = await axios.put<ITareaList[]>(URL_BACKLOG, {tareas : tareas})
        return response.data
    }catch (error){
        console.log("Error en putTareaList ", error)
    }
}



