import { Button } from "react-bootstrap"
import styles from './TareaCard.module.css'
import { ITareas } from "../../../types/ITareas"
import { FC } from "react"

type ITareaCard = {
    tarea: ITareas
}

export const TareaCard: FC<ITareaCard> = ({tarea}) => {


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
            <Button variant='primary'>✒</Button>
            <Button variant='danger'>❌</Button>
            </div>
            </div>
        </div>
    
    </>
  )
}
