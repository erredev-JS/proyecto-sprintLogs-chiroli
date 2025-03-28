import { create } from "zustand";
import { ITareas } from "../types/ITareas";




interface IStoreTareas {
    //agrego tarea activa (Thomy)
    tareaActiva: ITareas | null

    tareas: ITareas[]
    addTareaInactiva: (tarea: ITareas) => void
    editTarea: (tareaActualizada: ITareas) => void
    deleteTarea: (idTarea: string) => void

    //setear tarea activa (Thomy)
    setTareaActiva: (tarea: ITareas | null) => void
    //arrayDeEstadoInicial
}


export const useStoreTareas = create<IStoreTareas>((set) => ({
    //tarea Activa (Thomy)
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


    //setear tarea activa (Thomy)
    setTareaActiva: (tareaActivaIn) => set(() => ({ tareaActiva: tareaActivaIn}))
}))


export default useStoreTareas