import { create } from "zustand";

interface IStoreModal{
    openSprint : boolean,
    openTask : boolean, 
    openModalSprint : VoidFunction,
    openModalTask : VoidFunction,
    closeModalSprint : VoidFunction
    closeModalTask : VoidFunction,

}

export const useStoreModal = create<IStoreModal>((set) => ({
    openSprint : false,
    openTask : false,
    openModalSprint : () => set({openSprint : true}), // Abre el modal de Sprints
    closeModalSprint : () => set({openSprint : false}), // Cierra el modal de Sprints
    openModalTask : () => set({openTask : true}), // Abre modal de tareas
    closeModalTask : () => set({openTask: false}) // Cierra modal de tareas
}))


