import { Button } from "react-bootstrap"
import styles from './CardTaskInSprint.module.css'
import { ITareas } from "../../../types/ITareas"
import { FC } from "react"
import { useStoreModal } from "../../../store/useStoreModal"
import useStoreTareas from "../../../store/useStoreTareas"
import Swal from "sweetalert2"
import { createTareaController, deleteTareaController } from "../../../data/tareaController"
import viewIcon from '../../../assets/viewIcon.svg'
import editIcon from '../../../assets/editIcon.svg'
import deleteIcon from '../../../assets/deleteIcon.svg'
import { updateSprintController } from "../../../data/sprintController"
import useStoreSprints from "../../../store/useStoreSprints"
import { popUpSweetAlert } from "../../../utils/popUpSweetAlert"




type CardTaskInSprint = {
    tarea: ITareas
    estado: string
}

export const CardTaskInSprint: FC<CardTaskInSprint> = ({tarea, estado}) => {


 /*  const handleSendTask = async () => {
          if(!sprintSeleccionada || !tareaActiva) return // Si no hay seleccionada una sprint o no hay tarea activa corta el handle
  
          const sprintUpdate = sprints.find((sprint) => sprint.id === sprintSeleccionada)
  
          if (!sprintUpdate) return 
  
          const newSprint = {
              ...sprintUpdate, tareas: [...sprintUpdate.tareas, tareaActiva]
          }
  
          await updateSprintController(newSprint)
  
          addTaskToSprint(tareaActiva, sprintSeleccionada) // Actualizo el estado
          deleteTareaController(tareaActiva.id)
          setTareaActiva(null)
          
          closeModalTaskSend()
  
*/
  const sprintActiva = useStoreSprints((state) => state.sprintActiva)

  const {openModalTask, openModalViewTask, openModalTaskSend} = useStoreModal()

  const {deleteTaskSprint} = useStoreSprints()

  const setTareaActiva = useStoreTareas((state) => state.setTareaActiva)

  const {addTareaInactiva} = useStoreTareas()


  const handleOpenModalTareaEdit = (tarea: ITareas)=> {
    setTareaActiva(tarea)
    openModalTask()
  }
  const handleOpenModalView = (tarea: ITareas)=> {
    setTareaActiva(tarea)
    openModalViewTask()
  }



  const handleDeleteTarea = async () => {
    if (sprintActiva) {
      // 1. Crear nueva lista de tareas
      const tareasActualizadas = sprintActiva.tareas.filter(t => t.id !== tarea.id);
  
      // 2. Crear nueva sprint actualizada
      const nuevaSprint = { ...sprintActiva, tareas: tareasActualizadas };
  
      // 3. Enviar al backend
      await updateSprintController(nuevaSprint);
  
      // 4. Actualizar store
      deleteTaskSprint(tarea.id, sprintActiva.id);
    }
  };

  const handleSendTaskToBacklog = async () => {
    if (!sprintActiva) return;
    await deleteTaskSprint(tarea.id, sprintActiva.id);

    const sprintActualizada = useStoreSprints.getState().sprints.find((sprint) => sprint.id === sprintActiva.id);

    if(!sprintActualizada) return

    await updateSprintController(sprintActualizada)
    addTareaInactiva(tarea)
    createTareaController(tarea)

    popUpSweetAlert("Tarea enviada al Backlog", "La tarea está en el backlog ahora");
  }

  const cambiarEstadoTarea = async (direccion: number) => {
    if (!sprintActiva) return;
  
    const estados = ["pendiente", "en_progreso", "finalizada"];
    const indiceActual = estados.indexOf(tarea.estado);
    const nuevoIndice = indiceActual + direccion;
  
    // Evitar índices fuera de rango
    if (nuevoIndice < 0 || nuevoIndice >= estados.length) return;
  
    const tareaActualizada: ITareas = {
      ...tarea,
      estado: estados[nuevoIndice],
    };
  
    const tareasActualizadas = sprintActiva.tareas.map((t) =>
      t.id === tarea.id ? tareaActualizada : t
    );
  
    const nuevaSprint = {
      ...sprintActiva,
      tareas: tareasActualizadas,
    };
  
    await updateSprintController(nuevaSprint);
    useStoreSprints.getState().editTaskSprint(tareaActualizada, sprintActiva.id);
  };
  

  return (
    <>
        <div className={styles.taskCard}>
            <div className={styles.cardInfo}>
            <p>Titulo: {tarea.titulo}</p>
            <p>Descripcion:</p>
            <p>{tarea.descripcion}</p>

            </div>
            <div className={styles.buttonsResponsive}>

            <div className={styles.cardSend}>
            <div className={styles.buttonState}>

            <button
           className={styles.btnInState}
           onClick={() => cambiarEstadoTarea(-1)}
           disabled={tarea.estado === "pendiente"}
           >
           ⬅️
          </button>
  <span className={styles.estadoTexto}>{tarea.estado}</span>
  <button
    className={styles.btnInState}
    onClick={() => cambiarEstadoTarea(1)}
    disabled={tarea.estado === "finalizada"}
    >
    ➡️
  </button>
    </div>
            </div>
            <Button style={{ backgroundColor: "#6B63D4", border: "none", outline: "none", color: "white", width: "160px" }} onClick={handleSendTaskToBacklog} >Enviar al Backlog</Button>
            <div className={styles.cardButtons}>
            <Button onClick={() => handleOpenModalView(tarea)} style={{ backgroundColor: "#6B63D4", border: "none", outline: "none", color: "white" }}  className={styles.btnCustom}><img src={viewIcon} /></Button>
            <Button  style={{ backgroundColor: "#6B63D4", border: "none", outline: "none", color: "white" }} onClick={()=>handleOpenModalTareaEdit(tarea)}  className={styles.btnCustom}><img src={editIcon} /></Button>
            <Button variant='danger' onClick={handleDeleteTarea} className={styles.btnCustomDelete}> <img src={deleteIcon}  /></Button>
            </div>
            </div>
        </div>
    
    </>
  )
}
