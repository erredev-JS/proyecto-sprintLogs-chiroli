import { Button } from "react-bootstrap"
import styles from './TareaCard.module.css'
import { ITareas } from "../../../types/ITareas"
import { FC } from "react"
import { useStoreModal } from "../../../store/useStoreModal"
import useStoreTareas from "../../../store/useStoreTareas"
import Swal from "sweetalert2"
import { deleteTareaController } from "../../../data/tareaController"
import viewIcon from '../../../assets/viewIcon.svg'
import editIcon from '../../../assets/editIcon.svg'
import deleteIcon from '../../../assets/deleteIcon.svg'



type ITareaCard = {
    tarea: ITareas
}

export const TareaCard: FC<ITareaCard> = ({tarea}) => {

  const {openModalTask, openModalViewTask, openModalTaskSend} = useStoreModal()

  const {deleteTarea} = useStoreTareas()

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


  const handleDeleteTarea = () => {
    const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: true
});
swalWithBootstrapButtons.fire({
  title: "¿Eliminar Tarea?",
  text: "Esta accion no se puede revertir!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Si, eliminar!",
  cancelButtonText: "Cancelar",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      
      title: "Borrada!",
      text: "La tarea ha sido eliminada.",
      icon: "success"
    });
    deleteTareaController(tarea.id)
    deleteTarea(tarea.id)
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelado",
      text: ``,
      icon: "error"
    });
  }
});
  }

  return (
    <>
        <div className={styles.taskCard}>
            <div className={styles.cardInfo}>
            <p>Titulo: {tarea.titulo}</p>
            <p>Descripcion: {tarea.descripcion}</p>

            </div>
            <div className={styles.buttonsResponsive}>

            <div className={styles.cardSend}>
            <Button onClick={() => handleOpenModalSendTask(tarea)}  style={{ backgroundColor: "#6B63D4", border: "none", outline: "none", color: "white" }} className={styles.btnCustom}>Enviar a 🏁</Button>
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
