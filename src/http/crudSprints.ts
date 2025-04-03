import axios from "axios";
import { ISprintList } from "../types/iSprintList";
import { URL_SPRINTLIST } from "../utils/constantes";
import { ISprint } from "../types/iSprints";


export const putSprintList = async (sprints: ISprint[]) => {
    try{
        const response = await axios.put<ISprintList[]>(URL_SPRINTLIST, {sprints : sprints})
        return response.data
    }catch (error){
        console.log("Error en putSprintList ", error)
    }
}