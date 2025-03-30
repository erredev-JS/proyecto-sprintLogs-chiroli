import { Button } from "react-bootstrap"
import styles from "./listSprint.module.css"
 
import { useStoreModal } from "../../../store/useStoreModal"

import useStoreSprints from "../../../store/useStoreSprints"



export const ListSprint = () => {

    const {sprints} = useStoreSprints()
    const {openModalTask} = useStoreModal()
    


    return (
        <div className={styles.containerPrincipal}>

            <div className={styles.containerTitle}>
                <h2>Tareas de la Sprint 1</h2>
                <div className={styles.containerButton}>
                    <Button onClick={openModalTask}>Crear Tarea</Button>
                </div>
            </div>

            <div className={styles.containercontentFlex}>

                <div className={styles.containerContentTasks}>
                    <h6>Tareas Pendientes : 1</h6>
                    <div className={styles.containerTasks}>                       
                        {sprints.map(sprints => (
                            sprints.tareas.map(task => (
                                task.estado.toLocaleLowerCase() === 'pendiente' &&
                                <p>{task.titulo}</p>
                            ))
                        ))}
                    </div>
                </div>

                <div className={styles.containerContentTasks}>
                    
                    <h6>Tareas en Progreso : 1</h6>
                    <div className={styles.containerTasks}>
                        {sprints.map(sprints => (
                            sprints.tareas.map(task => (
                                task.estado.toLocaleLowerCase() === 'en progreso' &&
                                <p>{task.titulo}</p>
                            ))
                        ))}
                    </div>
                </div>

                <div className={styles.containerContentTasks}>
                    <h6>Tareas Finalizadas : 1</h6>
                    <div className={styles.containerTasks}>
                        {sprints.map(sprints => (
                            sprints.tareas.map(task => (
                                task.estado.toLocaleLowerCase() === 'finalizado' &&
                                <p>{task.titulo}</p>
                            ))
                        ))}
                    </div>  
                </div>

            </div>
        </div>
    )
}