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

  
    setSprintActiva: (sprint: ISprint | null) => void
    
    // Tareas

    addTareaAsignada: (tarea: ITareas) => void
    deleteTareaAsignada: (idSprint: string) => void
    editTareaAsignada: (tareaActualizada: ITareas) => void
   
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


    setSprintActiva: (sprintActivaIn) => set(() => ({ sprintActiva: sprintActivaIn})),

    // Tareas asignadas

    addTareaAsignada: (tarea) => set((state) => ({
        tareasAsignadas: [...state.tareasAsignadas, tarea]
    })),

    deleteTareaAsignada: (idTarea) => set((state) => ({
        tareasAsignadas : state.tareasAsignadas.filter((tarea) => tarea.id !== idTarea)
       
    })),


    editTareaAsignada: (tareaActualizada) => set((state) => {
        const tareasAsignadas =  state.tareasAsignadas.map((tarea) => tarea.id === tareaActualizada.id ? {...tarea, ...tareaActualizada} : tarea)
        return {tareasAsignadas: tareasAsignadas}
    })


    
}))


export default useStoreSprints