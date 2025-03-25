import { Button } from 'react-bootstrap'
import styles from './ListBacklog.module.css'



export const ListBacklog = () => {
  return (
    <>
    <div className={styles.mainContainer}>
    <h1>Backlog</h1>
    <div className={styles.tasksContainer}>
    <p>Tareas en el backlog</p>
    <Button variant="primary">Crear tarea</Button>
    </div>
    <div className={styles.listContainer}>
     
        <div className={styles.taskCard}>
            <div className={styles.cardInfo}>
            <p>Titulo: tarea1</p>
            <p>Descripcion: estamos aca...</p>

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
        <div className={styles.taskCard}>
            <div className={styles.cardInfo}>
            <p>Titulo: tarea2</p>
            <p>Descripcion: estamos aca...</p>

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
    </div>
    </div>
    </>

  )
}
