import { create } from "zustand";

interface IStoreModal{
    openSprint : boolean,
    openTask : boolean,
    openViewTask : boolean, 
    openModalSprint : VoidFunction,
    openModalTask : VoidFunction,
    openModalViewTask : VoidFunction
    closeModalSprint : VoidFunction
    closeModalTask : VoidFunction,
    closeModalViewTask : VoidFunction

}

export const useStoreModal = create<IStoreModal>((set) => ({
    openSprint : false,
    openTask : false,
    openViewTask : false,
    openModalSprint : () => set({openSprint : true}), // Abre el modal de Sprints
    closeModalSprint : () => set({openSprint : false}), // Cierra el modal de Sprints
    openModalTask : () => set({openTask : true}), // Abre modal de tareas
    closeModalTask : () => set({openTask: false}), // Cierra modal de tareas
    openModalViewTask : () => set({openViewTask : true}),
    closeModalViewTask : () => set({openViewTask : false})

}))


