import { create } from "zustand";

import ITareas from "../types/ITareas";



interface IStoreTareas {
    tareasInactivas: ITareas[]
    addTareaInactiva: (tarea: ITareas) => void
    editTarea: (tareaActualizada: ITareas) => void
    deleteTarea: (idTarea: string) => void
}


export const useStoreTareas = create<IStoreTareas>((set) => ({
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

    }))

}))


export default useStoreTareas