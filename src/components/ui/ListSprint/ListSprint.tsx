import { Button } from "react-bootstrap"
import styles from "./listSprint.module.css"
 
import { useStoreModal } from "../../../store/useStoreModal"

import useStoreSprints from "../../../store/useStoreSprints"

import { useEffect } from "react"



export const ListSprint = () => {

    const {sprints, setSprintActiva, sprintActiva} = useStoreSprints()
    const {openModalTask} = useStoreModal()
    
    
    useEffect(()=>{
        setSprintActiva(sprints[0])
        console.log(sprintActiva);
        
    },[sprintActiva])

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
                    {sprintActiva?.tareas.map(task => (
                            task.estado === 'pendiente' &&
                            <div>
                                <p>{task.titulo}</p>
                                <p>{task.id}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.containerContentTasks}>
                    
                    <h6>Tareas en Progreso : 1</h6>
                    <div className={styles.containerTasks}>
                    {sprintActiva?.tareas.map(task => (
                            task.estado === 'en progreso' &&
                            <div>
                                <p>{task.titulo}</p>
                                <p>{task.id}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.containerContentTasks}>
                    <h6>Tareas Finalizadas : 1</h6>
                    <div className={styles.containerTasks}>
                        {sprintActiva?.tareas.map(task => (
                            task.estado === 'finalizada' &&
                            <div>
                                <p>{task.titulo}</p>
                                <p>{task.id}</p>
                            </div>
                        ))}
                    </div>  
                </div>

            </div>
        </div>
    )
}