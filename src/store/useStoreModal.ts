import { create } from "zustand";

interface IStoreModal{
    open : boolean,
    openModal : () => void,
    closeModal : () => void 
}

export const useStoreModal = create<IStoreModal>((set) => ({
    open : false,
    openModal : () => set({open : true}), // Abre el modal
    closeModal : () => set({open : false}) // Cierra el modal
}))


