import { Button } from 'react-bootstrap'

import styles from './ModalCard.module.css'
import { useStoreModal } from '../../../store/useStoreModal'
import { ITareas } from '../../../types/ITareas'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import useStoreTareas from '../../../store/useStoreTareas'
import { createTareaController, updateTareaController } from '../../../data/tareaController'
import useStoreSprints from '../../../store/useStoreSprints'
import { updateSprintController } from '../../../data/sprintController'


export const ModalCard = () => {
    const initialStateTarea: ITareas = {
        id: "",
        titulo: "",
        descripcion: "",
        estado: "",
        fechaLimite: ""
    }

    const {sprintActiva, addTaskToSprint, editTaskSprint} = useStoreSprints()
    const {tareaActiva, editTarea, setTareaActiva, addTareaInactiva} = useStoreTareas()
    const {closeModalTask} = useStoreModal()
    const [formValues, setFormValues] = useState<ITareas>(initialStateTarea);

    useEffect(()=> {
        if(tareaActiva){
            setFormValues({...tareaActiva})
        }else {
            setFormValues(initialStateTarea); 
        }
    }, [tareaActiva])

    
    
    

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormValues((prev)=>({...prev, [`${name}`]:value,}))
    }

    const handleCloseModalTask = () => {
        setTareaActiva(null)
        closeModalTask()
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if(!sprintActiva){
            if(!tareaActiva){
                formValues.id = Date.now().toString()
                formValues.estado = "pendiente"
                createTareaController(formValues)
                addTareaInactiva(formValues)
            }else{
                updateTareaController(formValues)
                editTarea(formValues)
                
            }
        }else{
            if(!tareaActiva){
                console.log("Creando tarea en Sprint activa", sprintActiva.nombre)
                formValues.id = Date.now().toString()
                formValues.estado = "pendiente"
                addTaskToSprint(formValues, sprintActiva.id)
                updateSprintController(sprintActiva)
            }else{
                editTaskSprint(formValues, sprintActiva.id)
                updateSprintController(sprintActiva)
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
                        <input type="text" name="titulo" id="" placeholder='Titulo' value={formValues.titulo}
                        onChange={handleChange}/>
                    
                        <input type="text" name="descripcion" id="" placeholder='Descripcion' value={formValues.descripcion}
                        onChange={handleChange}/>
                        <label htmlFor="">Fecha Limite</label>
                        <input type="date" name="fechaLimite" id="" placeholder='Fecha Limite' value={formValues.fechaLimite}
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

