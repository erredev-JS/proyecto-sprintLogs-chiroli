import axios from "axios"

import { URL_SPRINTLIST } from "../utils/constantes"
import { putSprintList } from "../http/crudSprints"
import Swal from "sweetalert2"
import { ISprint } from "../types/iSprints"



export const getAllSprintsController = async (): Promise<ISprint[] | undefined> => {
    try{
        const response = await axios.get<{sprints: ISprint[]}>(URL_SPRINTLIST)
        return response.data.sprints
    }catch(error){
        console.log("Hubo un error en getAllSprints", error)
    }
}

export const createSprintController = async (nuevaSprint: ISprint) => {
    try{
        const sprintsBd = await getAllSprintsController()
            
        if(sprintsBd){
            await putSprintList([...sprintsBd, nuevaSprint])
        }else{
            await putSprintList([nuevaSprint])
        }
    }catch(error){
        console.log("Hubo un error en getAllSprints", error)
    }
}

export const updateSprintController = async (nuevaSprint: ISprint) => {
    try{
        const sprintsBd = await getAllSprintsController()
            
        if(sprintsBd){
            const result = sprintsBd.map((sprintBd) => 
                sprintBd.id === nuevaSprint.id 
            ? {...sprintBd, ...nuevaSprint} 
            : sprintBd
        )

        await putSprintList(result)

        Swal.fire({
            title: "Sprint actualizada!",
            text: "",
            icon: "success"
        });

        }

        

    }catch(error){
        console.log("Hubo un error en getAllSprints", error)
    }
}

export const eliminateSprintController = async (idSprintAEliminar: string) => {
    try{
            const sprintsBd = await getAllSprintsController()
    
            if(sprintsBd){
                const result = sprintsBd.filter((spintBd) => spintBd.id !== idSprintAEliminar)
                
                await putSprintList(result)
            }
    
        }catch(error){
            console.log("Hubo un error al eliminar la tarea", error)
        }
}
