import { Button } from 'react-bootstrap'
import styles from './ListBacklog.module.css'
import { useEffect } from 'react';
import { TareaCard } from '../TareaCard/TareaCard';
import { useStoreModal } from '../../../store/useStoreModal';
import { getAllTareasController } from '../../../data/tareaController';
import useStoreTareas from '../../../store/useStoreTareas';
import { getAllSprintsController } from '../../../data/sprintController';



export const ListBacklog = () => {

  

  const {openModalTask} = useStoreModal()

  //aqui se deberia setear el array de tareas en los estado globales
  const setTareas = useStoreTareas((state) => state.setTareas)

  const {tareas} = useStoreTareas()

  
  
  
    useEffect(() => {
      
      const firstGetTareas = async () => {
        const tareas = await getAllTareasController();
        setTareas(tareas ?? []);
        console.log(tareas)
      }

      //borrar esta funcion cuando se aplique la 2da screen
      const getSprintProvisional = async () => {
        const sprints = await getAllSprintsController()
        console.log(sprints)
      }
      getSprintProvisional()
      
      firstGetTareas();
      
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
     
        {tareas.map((tarea) => (
          <TareaCard key={tarea.id} tarea={tarea}></TareaCard>
        ))}

    </div>
    </div>
    </>

  )
}
