import { Button } from "react-bootstrap"
import styles from './TareaCard.module.css'
import { ITareas } from "../../../types/ITareas"
import { FC } from "react"
import { useStoreModal } from "../../../store/useStoreModal"
import useStoreTareas from "../../../store/useStoreTareas"

type ITareaCard = {
    tarea: ITareas
}

export const TareaCard: FC<ITareaCard> = ({tarea}) => {

  const {openModalTask} = useStoreModal()

  const setTareaActiva = useStoreTareas((state) => state.setTareaActiva)

  const handleOpenModalTareaEdit = (tarea: ITareas)=> {
    setTareaActiva(tarea)
    openModalTask()
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
            <Button variant='danger'>❌</Button>
            </div>
            </div>
        </div>
    
    </>
  )
}
