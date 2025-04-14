import { Button } from "react-bootstrap"
import styles from "./listSprint.module.css"
 
import { useStoreModal } from "../../../store/useStoreModal"

import useStoreSprints from "../../../store/useStoreSprints"

import { useEffect, useState } from "react"
import {  useParams } from "react-router-dom"
import { ISprint } from "../../../types/iSprints"

import { CardTaskInSprint } from "../CardTaskInSprint/CardTaskInSprint"



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


    const pendingTasks = selectedSprint?.tareas.filter(task => task.estado === 'pendiente') || []
    const inProgress = selectedSprint?.tareas.filter(task => task.estado === 'en_progreso') || []
    const completed = selectedSprint?.tareas.filter(task => task.estado === 'finalizada') || []


    return (
        <div className={styles.containerPrincipal}>

            <div className={styles.containerTitle}>
                <h2>Tareas de la {selectedSprint?.nombre}</h2>
                <div className={styles.containerButton}>
                    <Button onClick={openModalTask} className={`${styles.btnCustom}`}>Crear Tarea</Button>
                </div>
            </div>

            <div className={styles.containercontentFlex}>

                <div className={styles.containerContentTasks}>
                    <h6>Tareas Pendientes : {pendingTasks.length}</h6>
                    <div className={styles.containerTasks}>                       
                    {selectedSprint?.tareas.map(task => (
                            task.estado === 'pendiente' &&
                            <div className={styles.listContainer}>
    
                             <CardTaskInSprint key={task.id} tarea={task} estado="pendiente" />
      

    </div>
                        ))}
                    </div>
                </div>

                <div className={styles.containerContentTasks}>
                    
                    <h6>Tareas en Progreso : {inProgress.length}</h6>
                    <div className={styles.containerTasks}>
                    {selectedSprint?.tareas.map(task => (
                            task.estado === 'en_progreso' &&
                            <CardTaskInSprint key={task.id} tarea={task} estado="en_progreso" />
                        ))}
                    </div>
                </div>

                <div className={styles.containerContentTasks}>
                    <h6>Tareas Finalizadas : {completed.length}</h6>
                    <div className={styles.containerTasks}>
                        {selectedSprint?.tareas.map(task => (
                            task.estado === 'finalizada' &&
                            <CardTaskInSprint key={task.id} tarea={task} estado="finalizada" />
                        ))}
                    </div>  
                </div>

            </div>
        </div>
    )
}