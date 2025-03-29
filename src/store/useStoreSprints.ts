import { create } from "zustand";
import { ISprint } from "../types/ISprints";


interface IStoreSprints {
  sprintActiva: ISprint | null;

  sprints: ISprint[];
 
  addSprint: (sprint: ISprint) => void;
  editSprint: (sprintActualizado: ISprint) => void;
  deleteSprint: (idSprint: string) => void;

  setSprintActiva: (sprint: ISprint | null) => void;


}

export const useStoreSprints = create<IStoreSprints>((set) => ({
  sprintActiva: null,

  sprints: [] as ISprint[],


  addSprint: (sprint) =>
    set((state) => ({
      sprints: [...state.sprints, sprint],
    })),

  editSprint: (sprintActualizada) =>
    set((state) => {
      const arraySprints = state.sprints.map((sprint) => (sprint.id === sprintActualizada.id ? { ...sprint, ...sprintActualizada } : sprint));
      return { sprints: arraySprints };
    }),

  deleteSprint: (idSprint) =>
    set((state) => ({
      sprints: state.sprints.filter((sprint) => sprint.id !== idSprint),
    })),

  setSprintActiva: (sprintActivaIn) => set(() => ({ sprintActiva: sprintActivaIn })),



}));

export default useStoreSprints;
