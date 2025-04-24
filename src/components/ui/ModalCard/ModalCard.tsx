import { Button } from 'react-bootstrap'

import styles from './ModalCard.module.css'
import { useStoreModal } from '../../../store/useStoreModal'
import { ITareas } from '../../../types/ITareas'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import useStoreTareas from '../../../store/useStoreTareas'
import { createTareaController, updateTareaController } from '../../../data/tareaController'
import useStoreSprints from '../../../store/useStoreSprints'
import { updateSprintController } from '../../../data/sprintController'
import { bigSweetAlertPopup } from '../../../utils/bigSweetAlertPopup'


export const ModalCard = () => {
    const initialStateTarea: ITareas = {
        id: "",
        titulo: "",
        descripcion: "",
        estado: "",
        fechaLimite: ""
    }

    const {sprintActiva, addTaskToSprint, setSprintActiva, editTaskSprint} = useStoreSprints()
    const {tareaActiva, editTarea, setTareaActiva, addTareaInactiva} = useStoreTareas()
    const {closeModalTask} = useStoreModal()
    const [formValues, setFormValues] = useState<ITareas>(initialStateTarea);


    useEffect(()=> {
        if(tareaActiva){
            setFormValues({...tareaActiva}) // Copia valores de la tarea activa si la hay
        }else {
            setFormValues(initialStateTarea);  // Inicia con valores default
        }
    }, [tareaActiva])

    
    
    
    // Funcion que maneja el cambio del form
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormValues((prev)=>({...prev, [`${name}`]:value,}))
    }

    // Funcion que cierra el modal 
    const handleCloseModalTask = () => {
        setTareaActiva(null)
        closeModalTask()
    }

    // Funcion que crea la tarea
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Si no hay Sprint activa la crea en el backlog
        if(!sprintActiva){
            if(!tareaActiva){
                formValues.id = Date.now().toString()
                formValues.estado = "pendiente"
                createTareaController(formValues)
                addTareaInactiva(formValues)
                bigSweetAlertPopup("Tarea creada")
            }else{
                updateTareaController(formValues)
                editTarea(formValues)
                bigSweetAlertPopup("Tarea actualizada")

            }

        // Si hay sprint activa la crea dentro de ella
        }else{
            if(!tareaActiva){
                console.log("Creando tarea en Sprint activa", sprintActiva.nombre)
                formValues.id = Date.now().toString()
                formValues.estado = "pendiente"
                addTaskToSprint(formValues, sprintActiva.id)

                const sprintActualizado = useStoreSprints.getState().sprints.find(s => s.id === sprintActiva.id)

                if (sprintActualizado) {
                    setSprintActiva(sprintActualizado)
                updateSprintController(sprintActualizado)
                bigSweetAlertPopup("Tarea creada en la Sprint")

                }

            // Si hay tarea activa la actualiza 
            }else{
                editTaskSprint(formValues, sprintActiva.id)
                const sprintActualizado = useStoreSprints.getState().sprints.find(s => s.id === sprintActiva.id)

                if (sprintActualizado) {
                    setSprintActiva(sprintActualizado)
                    updateSprintController(sprintActualizado)
                    bigSweetAlertPopup("Tarea actualizada")

                }
            }
        }


        setTareaActiva(null)
        closeModalTask()
    }
    
    
    return(
        <div className={styles.backgroundFilter}>
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}>  
                    <h2>{tareaActiva? "Editar Tarea" : "Crear Tarea"}</h2>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className={styles.containerForm} action="">
                        <input type="text" name="titulo" id="" placeholder='Titulo' required value={formValues.titulo}
                        onChange={handleChange}/>

                        <textarea name="descripcion" id="" placeholder='Descripcion' value={formValues.descripcion}
                        onChange={handleChange} />
                    
                        <label htmlFor="">Fecha Limite</label>
                        <input type="date" name="fechaLimite" id="" placeholder='Fecha Limite' required value={formValues.fechaLimite}
                        onChange={handleChange}/>

                    
                        <div className={styles.containerButtons}>
                            <Button variant='danger' onClick={handleCloseModalTask}>Cancelar</Button> 
                            <Button type='submit' variant='success'>Aceptar</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

