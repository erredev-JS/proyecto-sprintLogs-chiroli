import { Button } from 'react-bootstrap'
import styles from './ListBacklog.module.css'
import { useEffect, useState } from 'react';
import { ITareas } from '../../../types/ITareas';
import { getAllTareas } from '../../../http/crudTareas';
import { TareaCard } from '../TareaCard/TareaCard';
import { useStoreModal } from '../../../store/useStoreModal';



export const ListBacklog = () => {


  const {openModalTask} = useStoreModal()

  //aqui se deberia setear el array de tareas en los estado globales
  const [arrayTareas, setArrayTareas] = useState<ITareas[]>([]);

  console.log(arrayTareas)
  
    useEffect(() => {
      const traerTareasProvisional = async () => {
        const tareas = await getAllTareas();
        setArrayTareas(tareas ?? []);
      }
  
      traerTareasProvisional();
      
    }, [])

  return (
    <>
    <div className={styles.mainContainer}>
    <h1>Backlog</h1>
    <div className={styles.tasksContainer}>
    <p>Tareas en el backlog</p>
    <Button variant="primary" onClick={openModalTask}>Crear tarea</Button>
    </div>
    <div className={styles.listContainer}>
     
        {arrayTareas.map((tarea) => (
          <TareaCard key={tarea.id} tarea={tarea}></TareaCard>
        ))}



        {/* <div className={styles.taskCard}>
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
        </div> */}
    </div>
    </div>
    </>

  )
}
