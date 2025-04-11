import { create } from "zustand";

interface IStoreModal{
    openSprint : boolean,
    openTask : boolean,
    openViewTask : boolean,
    openTaskSend : boolean, 
    openModalSprint : VoidFunction,
    openModalTask : VoidFunction,
    openModalViewTask : VoidFunction,
    openModalTaskSend : VoidFunction,
    closeModalSprint : VoidFunction,
    closeModalTask : VoidFunction,
    closeModalViewTask : VoidFunction
    closeModalTaskSend : VoidFunction

}

export const useStoreModal = create<IStoreModal>((set) => ({
    openSprint : false,
    openTask : false,
    openViewTask : false,
    openTaskSend: false,
    openModalSprint : () => set({openSprint : true}), // Abre el modal de Sprints
    closeModalSprint : () => set({openSprint : false}), // Cierra el modal de Sprints
    openModalTask : () => set({openTask : true}), // Abre modal de tareas
    closeModalTask : () => set({openTask: false}), // Cierra modal de tareas
    openModalViewTask : () => set({openViewTask : true}),
    closeModalViewTask : () => set({openViewTask : false}),
    openModalTaskSend : () => set({openTaskSend : true}),
    closeModalTaskSend : () => set ({openTaskSend : false})

}))


