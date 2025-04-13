import { create } from "zustand";
import { ISprint } from "../types/iSprints";
import { ITareas } from "../types/ITareas";


interface IStoreSprints {
  sprintActiva: ISprint | null;

  sprints: ISprint[];
 
  addSprint: (sprint: ISprint) => void;
  editSprint: (sprintActualizado: ISprint) => void;
  deleteSprint: (idSprint: string) => void;

  setSprintActiva: (sprint: ISprint | null) => void;



  /// Añadir tarea a una sprint


  addTaskToSprint: (tarea: ITareas, idSprint: string) => void
  deleteTaskSprint: (idTarea: string, idSprint: string) => void
  editTaskSprint: (tareaActualizada: ITareas, idSprint: string) => void



  //
  setSprints : (sprints : ISprint[]) => void
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

  addTaskToSprint: (tarea, idSprint) => set((state) => ({
    sprints: state.sprints.map((sprint) => sprint.id === idSprint ? {...sprint, tareas: [...sprint.tareas, tarea] } : sprint)
  })),
  deleteTaskSprint: (idTarea, idSprint) =>
    set((state) => {
      const nuevosSprints = state.sprints.map((sprint) =>
        sprint.id === idSprint
          ? {
              ...sprint,
              tareas: (sprint.tareas || []).filter(
                (tarea) => tarea.id !== idTarea
              ),
            }
          : sprint
      );
  
      const nuevaSprintActiva =
        state.sprintActiva?.id === idSprint
          ? nuevosSprints.find((s) => s.id === idSprint) || null
          : state.sprintActiva;
  
      return {
        sprints: nuevosSprints,
        sprintActiva: nuevaSprintActiva,
      };
    }),
  

    editTaskSprint: (tareaActualizada, idSprint) =>
      set((state) => {
        const nuevosSprints = state.sprints.map((sprint) =>
          sprint.id === idSprint
            ? {
                ...sprint,
                tareas: (sprint.tareas || []).map((tarea) =>
                  tarea.id === tareaActualizada.id
                    ? { ...tarea, ...tareaActualizada }
                    : tarea
                ),
              }
            : sprint
        );
    
        const nuevaSprintActiva =
          state.sprintActiva?.id === idSprint
            ? nuevosSprints.find((s) => s.id === idSprint) || null
            : state.sprintActiva;
    
        return {
          sprints: nuevosSprints,
          sprintActiva: nuevaSprintActiva,
        };
      }),
    
  
  setSprints : (sprintsIn) => set(() => ({
    sprints : sprintsIn
  }))
}));

export default useStoreSprints;
