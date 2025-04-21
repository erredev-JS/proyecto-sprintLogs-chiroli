import { Button } from "react-bootstrap"
import styles from './CardTaskInSprint.module.css'
import { ITareas } from "../../../types/ITareas"
import { FC } from "react"
import { useStoreModal } from "../../../store/useStoreModal"
import useStoreTareas from "../../../store/useStoreTareas"
import { createTareaController, deleteTareaController } from "../../../data/tareaController"
import viewIcon from '../../../assets/viewIcon.svg'
import editIcon from '../../../assets/editIcon.svg'
import deleteIcon from '../../../assets/deleteIcon.svg'
import { updateSprintController } from "../../../data/sprintController"
import useStoreSprints from "../../../store/useStoreSprints"
import { popUpSweetAlert } from "../../../utils/popUpSweetAlert"
import { bigSweetAlertPopup } from "../../../utils/bigSweetAlertPopup"
import Swal from "sweetalert2"




type CardTaskInSprint = {
    tarea: ITareas
    estado: string
}

export const CardTaskInSprint: FC<CardTaskInSprint> = ({tarea, estado}) => {

  const sprintActiva = useStoreSprints((state) => state.sprintActiva)

  const {openModalTask, openModalViewTask } = useStoreModal()

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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true
    });
  
    const result = await swalWithBootstrapButtons.fire({
      title: "¿Eliminar Tarea?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    });
  
    if (result.isConfirmed) {
      if (sprintActiva) {
        try {
          // 1. Nueva lista de tareas sin la que se quiere eliminar
          const tareasActualizadas = sprintActiva.tareas.filter(t => t.id !== tarea.id);
  
          // 2. Nueva sprint actualizada
          const nuevaSprint = { ...sprintActiva, tareas: tareasActualizadas };
  
          // 3. Backend
          await updateSprintController(nuevaSprint);
  
          // 4. Estado local
          deleteTaskSprint(tarea.id, sprintActiva.id);
  
          // 5. Alerta final (sin sombra gris, abajo derecha, customizada)
          bigSweetAlertPopup("Tarea eliminada correctamente");
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar la tarea.", "error");
        }
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelado", "La tarea no fue eliminada.", "info");
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
    popUpSweetAlert("Estado cambiado", "El estado de la tarea ha sido cambiado");
    useStoreSprints.getState().editTaskSprint(tareaActualizada, sprintActiva.id);
  };
  

  return (
    <>
        <div className={styles.taskCard}>
            <div className={styles.cardInfo}>
            <p>Titulo: {tarea.titulo}</p>
            <p>Descripcion:</p>
            <p className={styles.descripcionText}>{tarea.descripcion}</p>

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
            <Button style={{ backgroundColor: "#6B63D4", border: "none", outline: "none", color: "white", width: "120px", fontSize:"12px" }} onClick={handleSendTaskToBacklog} >Enviar al Backlog</Button>
            <div className={styles.cardButtons}>
            <Button onClick={() => handleOpenModalView(tarea)} style={{ backgroundColor: "#6B63D4", border: "none", outline: "none", color: "white" }}  className={styles.btnCustom}><img src={viewIcon} width={"16px"} /></Button>
            <Button  style={{ backgroundColor: "#6B63D4", border: "none", outline: "none", color: "white" }} onClick={()=>handleOpenModalTareaEdit(tarea)}  className={styles.btnCustom}><img src={editIcon} width={"16px"} /></Button>
            <Button variant='danger' onClick={handleDeleteTarea} className={styles.btnCustomDelete}> <img src={deleteIcon} width={"16px"} /></Button>
            </div>
            </div>
        </div>
    
    </>
  )
}
