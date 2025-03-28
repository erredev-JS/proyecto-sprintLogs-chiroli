import { create } from "zustand";
import { ISprint } from "../types/ISprints";
import { ITareas } from "../types/ITareas";




interface IStoreSprints {

    sprintActiva: ISprint | null

    sprints: ISprint[],
    tareasAsignadas: ITareas[],

    addSprint: (sprint: ISprint) => void
    editSprint: (sprintActualizado: ISprint) => void
    deleteSprint: (idSprint: string) => void

  
    setSprintActiva: (tarea: ISprint | null) => void
   
}


export const useStoreSprints = create<IStoreSprints>((set) => ({
   
    sprintActiva: null,


    
    
    sprints: [] as ISprint[],
    tareasAsignadas: [] as ITareas[],
    addSprint: (sprint) => set((state) => ({
        sprints: [...state.sprints, sprint]
    })),
    

    editSprint: (sprintActualizada) => set((state) => {
        const arraySprints =  state.sprints.map((sprint) => sprint.id === sprintActualizada.id ? {...sprint, ...sprintActualizada} : sprint)
        return {sprints: arraySprints}
    }),

    deleteSprint: (idSprint) => set((state) => ({
        sprints : state.sprints.filter((sprint) => sprint.id !== idSprint)

    })),


    
    setSprintActiva: (sprintActivaIn) => set(() => ({ sprintActiva: sprintActivaIn}))
}))


export default useStoreSprints