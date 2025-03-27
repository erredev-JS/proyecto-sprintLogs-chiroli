import { create } from "zustand";
import { ITareas } from "../types/ITareas";




interface IStoreTareas {
    //agrego tarea activa (Thomy)
    tareaActiva: ITareas | null

    tareasInactivas: ITareas[]
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


    tareasInactivas: [] as ITareas[],
    addTareaInactiva: (tarea) => set((state) => ({
        tareasInactivas: [...state.tareasInactivas, tarea]
    })),
    editTarea: (tareaActualizada) => set((state) => {
        const tareasInactivas =  state.tareasInactivas.map((tarea) => tarea.id === tareaActualizada.id ? {...tarea, ...tareaActualizada} : tarea)
        return {tareasInactivas: tareasInactivas}
    }),

    deleteTarea: (idTarea) => set((state) => ({
        tareasInactivas : state.tareasInactivas.filter((tarea) => tarea.id !== idTarea)

    })),


    //setear tarea activa (Thomy)
    setTareaActiva: (tareaActivaIn) => set(() => ({ tareaActiva: tareaActivaIn}))
}))


export default useStoreTareas