import { create } from "zustand";
import { ITareas } from "../types/ITareas";




interface IStoreTareas {

    tareaActiva: ITareas | null

    tareas: ITareas[]
    addTareaInactiva: (tarea: ITareas) => void
    editTarea: (tareaActualizada: ITareas) => void
    deleteTarea: (idTarea: string) => void

    setTareaState: (idTarea: string, state: string) => void

    setTareaActiva: (tarea: ITareas | null) => void
    setTareas: (tareas: ITareas[]) => void
}


export const useStoreTareas = create<IStoreTareas>((set) => ({

    tareaActiva: null,


    tareas: [] as ITareas[],
    addTareaInactiva: (tarea) => set((state) => ({
        tareas: [...state.tareas, tarea]
    })),
    editTarea: (tareaActualizada) => set((state) => {
        const tareas =  state.tareas.map((tarea) => tarea.id === tareaActualizada.id ? {...tarea, ...tareaActualizada} : tarea)
        return {tareas: tareas}
    }),

    setTareaState: (idTarea, nuevoEstado) => set((state) => ({
        tareas: state.tareas.map((tarea) => 
            tarea.id === idTarea ? { ...tarea, estado: nuevoEstado } : tarea
        )
    }))
    ,
        
    
    deleteTarea: (idTarea) => set((state) => ({
        tareas : state.tareas.filter((tarea) => tarea.id !== idTarea)

    })),


    
    setTareaActiva: (tareaActivaIn) => set(() => ({ tareaActiva: tareaActivaIn})),

    setTareas: (tareasIn) => set(() => ({ tareas: tareasIn})),
}))


export default useStoreTareas