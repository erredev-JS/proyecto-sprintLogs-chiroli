import { Button } from "react-bootstrap"
import styles from './CardTaskInSprint.module.css'
import { ITareas } from "../../../types/ITareas"
import { FC } from "react"
import { useStoreModal } from "../../../store/useStoreModal"
import useStoreTareas from "../../../store/useStoreTareas"
import Swal from "sweetalert2"
import { deleteTareaController } from "../../../data/tareaController"
import viewIcon from '../../../assets/viewIcon.svg'
import editIcon from '../../../assets/editIcon.svg'
import deleteIcon from '../../../assets/deleteIcon.svg'
import { updateSprintController } from "../../../data/sprintController"
import useStoreSprints from "../../../store/useStoreSprints"




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


  const handleOpenModalTareaEdit = (tarea: ITareas)=> {
    setTareaActiva(tarea)
    openModalTask()
  }
  const handleOpenModalView = (tarea: ITareas)=> {
    setTareaActiva(tarea)
    openModalViewTask()
  }

  const handleOpenModalSendTask = (tarea : ITareas) =>{
    setTareaActiva(tarea)
    openModalTaskSend()
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

  return (
    <>
        <div className={styles.taskCard}>
            <div className={styles.cardInfo}>
            <p>Titulo: {tarea.titulo}</p>
            <p>Descripcion: {tarea.descripcion}</p>

            </div>
            <div className={styles.buttonsResponsive}>

            <div className={styles.cardSend}>
            <Button onClick={() => handleOpenModalSendTask(tarea)}  style={{ backgroundColor: "#6B63D4", border: "none", outline: "none", color: "white" }} className={styles.btnCustom}>{estado}</Button>
            </div>
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
