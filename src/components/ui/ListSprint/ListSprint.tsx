import { Button } from "react-bootstrap"
import styles from "./listSprint.module.css"
 
import { useStoreModal } from "../../../store/useStoreModal"

import useStoreSprints from "../../../store/useStoreSprints"

import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { ISprint } from "../../../types/iSprints"



export const ListSprint = () => {

    const { idsprint } = useParams()
    
    //con esto se adquiere el id del sprint seleccionado
    

    const [selectedSprint, setSelectedSprint] = useState<ISprint>()

    const {sprints, setSprintActiva, sprintActiva} = useStoreSprints()
    const {openModalTask} = useStoreModal()
    
    
    useEffect(() => {
        if (!sprintActiva && sprints.length > 0) {
            setSprintActiva(sprints[0]); 
        }
    }, [sprints]); 
    
    useEffect(() => {
        const foundSprint = sprints.find((sprint) => sprint.id === idsprint)
        setSelectedSprint(foundSprint)
    }, [sprintActiva, idsprint]);

    return (
        <div className={styles.containerPrincipal}>

            <div className={styles.containerTitle}>
                <h2>Tareas de la {selectedSprint?.nombre}</h2>
                <div className={styles.containerButton}>
                    <Button onClick={openModalTask}>Crear Tarea</Button>
                </div>
            </div>

            <div className={styles.containercontentFlex}>

                <div className={styles.containerContentTasks}>
                    <h6>Tareas Pendientes : 1</h6>
                    <div className={styles.containerTasks}>                       
                    {selectedSprint?.tareas.map(task => (
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
                    {selectedSprint?.tareas.map(task => (
                            task.estado === 'en_progreso' &&
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
                        {selectedSprint?.tareas.map(task => (
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