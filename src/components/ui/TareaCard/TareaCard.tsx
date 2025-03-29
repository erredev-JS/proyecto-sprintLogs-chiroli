import { Button } from "react-bootstrap"
import styles from './TareaCard.module.css'
import { ITareas } from "../../../types/ITareas"
import { FC } from "react"
import { useStoreModal } from "../../../store/useStoreModal"
import useStoreTareas from "../../../store/useStoreTareas"
import Swal from "sweetalert2"
import { deleteTareaController } from "../../../data/tareaController"

type ITareaCard = {
    tarea: ITareas
}

export const TareaCard: FC<ITareaCard> = ({tarea}) => {

  const {openModalTask} = useStoreModal()

  const {deleteTarea} = useStoreTareas()

  const setTareaActiva = useStoreTareas((state) => state.setTareaActiva)

  const handleOpenModalTareaEdit = (tarea: ITareas)=> {
    setTareaActiva(tarea)
    openModalTask()
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
            <Button variant='primary'>Enviar a 🏁</Button>
            </div>
            <div className={styles.cardButtons}>
            <Button variant='primary'>👁</Button>
            <Button variant='primary' onClick={()=>handleOpenModalTareaEdit(tarea)}>✒</Button>
            <Button variant='danger' onClick={handleDeleteTarea}>❌</Button>
            </div>
            </div>
        </div>
    
    </>
  )
}
