import { create } from "zustand";
import { ITareas } from "../types/ITareas";




interface IStoreTareas {
   
    tareaActiva: ITareas | null

    tareas: ITareas[]
    addTareaInactiva: (tarea: ITareas) => void
    editTarea: (tareaActualizada: ITareas) => void
    deleteTarea: (idTarea: string) => void

  
    setTareaActiva: (tarea: ITareas | null) => void
   
}


export const useStoreTareas = create<IStoreTareas>((set) => ({
   
    tareaActiva: null,


    tareas: [] as ITareas[],
    addTareaInactiva: (tarea) => set((state) => ({
        tareas: [...state.tareas, tarea]
    })),
    editTarea: (tareaActualizada) => set((state) => {
        const tareasInactivas =  state.tareas.map((tarea) => tarea.id === tareaActualizada.id ? {...tarea, ...tareaActualizada} : tarea)
        return {tareas: tareasInactivas}
    }),

    deleteTarea: (idTarea) => set((state) => ({
        tareas : state.tareas.filter((tarea) => tarea.id !== idTarea)

    })),


    
    setTareaActiva: (tareaActivaIn) => set(() => ({ tareaActiva: tareaActivaIn}))
}))


export default useStoreTareas