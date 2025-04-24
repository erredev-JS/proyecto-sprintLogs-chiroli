import useStoreTareas from '../../../store/useStoreTareas'
import styles from './ModalSendTaskToSprint.module.css'
import useStoreSprints from '../../../store/useStoreSprints'
import { Button } from 'react-bootstrap'
import { useStoreModal } from '../../../store/useStoreModal'
import { useState } from 'react'
import { updateSprintController } from '../../../data/sprintController'
import { deleteTareaController } from '../../../data/tareaController'
import { bigSweetAlertPopup } from '../../../utils/bigSweetAlertPopup'


export const ModalSendTaskToSprint  = () => {

    const {sprints,addTaskToSprint} = useStoreSprints()
    const {tareaActiva, setTareaActiva} = useStoreTareas()
    const {closeModalTaskSend} = useStoreModal()
    const [sprintSeleccionada, setSprintSeleccionada] = useState<string | null>(null) // Estado para seleccionar el sprint
    
    const handleCloseModalSendTask = () => {
        setTareaActiva(null)
        closeModalTaskSend()
    }

    // Funcion que manda la tarea a una Sprint
    const handleSendTask = async () => {
        if(!sprintSeleccionada || !tareaActiva) return // Si no hay seleccionada una sprint o no hay tarea activa corta el handle

        const sprintUpdate = sprints.find((sprint) => sprint.id === sprintSeleccionada)

        if (!sprintUpdate) return 

        const newSprint = {
            ...sprintUpdate, tareas: [...sprintUpdate.tareas, tareaActiva] // Agrego tarea a la sprint que coincide con sprintseleccionada
        }

        await updateSprintController(newSprint)
        bigSweetAlertPopup("Tarea enviada a la Sprint")


        addTaskToSprint(tareaActiva, sprintSeleccionada) // Actualizo el estado
        deleteTareaController(tareaActiva.id)
        setTareaActiva(null)
        
        closeModalTaskSend()

    }

    return (
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h3>Enviar {tareaActiva?.titulo} a:</h3>
            </div>
            <div className={styles.containerListSprints}>
                <h5>Sprints</h5>
                {sprints.map((sprint) => (
                    // Mapea las sprints
                    <div key={sprint.id} onClick={() => setSprintSeleccionada(sprint.id)} className={`${styles.containerSprints} ${sprintSeleccionada === sprint.id ? styles.sprintactive : ''}`}>
                        {sprint.nombre}
                    </div>
                ))}
            </div>
            <div className={styles.containerButtons}>
                <Button variant='danger' onClick={handleCloseModalSendTask}>Cerrar</Button>
                <Button variant='success' disabled={!sprintSeleccionada} onClick={handleSendTask}>Aceptar</Button>
            </div>
        </div>
    )
}