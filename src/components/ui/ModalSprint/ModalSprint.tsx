import { Button } from 'react-bootstrap'
import styles from './ModalSprint.module.css'
import { useStoreModal } from '../../../store/useStoreModal'
import useStoreSprints from '../../../store/useStoreSprints'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ISprint } from '../../../types/iSprints'
import { createSprintController, updateSprintController } from '../../../data/sprintController'


const ModalSprint = () => {

    const initialStateSprint : ISprint = {
        id : '',
        fechaInicio : '',
        fechaCierre : '', 
        nombre : '',
        tareas : []
    }

    const { closeModalSprint} = useStoreModal()
    const {setSprintActiva, sprintActiva, addSprint, editSprint} = useStoreSprints()
    const [formValues, setFormValues] = useState<ISprint>(initialStateSprint) 

    const [previusSprinActiva,  setPreviusSprinActiva] = useState<null | ISprint>(null)

    useEffect(() => {
       if (sprintActiva){
        setFormValues({...sprintActiva})
        setPreviusSprinActiva(sprintActiva)
       }else{
        setFormValues(initialStateSprint)
       }
    }, [sprintActiva]);
    

    const handleChange =(e : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormValues((prev) => ({...prev, [`${name}`] : value}))
    }
    
    
    const handleCloseModalSprint = () => {
        if (previusSprinActiva) {
            setSprintActiva({ ...previusSprinActiva }) // Clonamos para forzar actualización
        } else {
            setSprintActiva(null)
        }
        closeModalSprint()
        window.location.reload() //esto esta causando errores al crear sprints
    }

    const handleSubmit = (e : FormEvent) => {
        e.preventDefault()

        if(!sprintActiva){
            formValues.id = Date.now().toString()
            createSprintController(formValues)
            addSprint(formValues)
            
        }else{
            updateSprintController(formValues)
            editSprint(formValues)
            
        }
        
        handleCloseModalSprint()
    }


    return(
        <div className={styles.backgroundFilter}>

        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>  
                <h2>Crear Sprint</h2>
            </div>
            <div>
                <form className={styles.containerForm}  onSubmit={handleSubmit} action="">
                    <input type="text" name="nombre" id="" placeholder='Titulo' value={formValues.nombre} onChange={handleChange} />
                    <label htmlFor="">Fecha Inicio</label>
                    <input type="date" name="fechaInicio" id="" value={formValues.fechaInicio} onChange={handleChange}/>
                    <label htmlFor="">Fecha Cierre</label>
                    <input type="date" name="fechaCierre" id="" placeholder='Fecha Cierre' value={formValues.fechaCierre} onChange={handleChange}/>
                    <div className={styles.containerButtons}>
                        <Button variant='danger' onClick={handleCloseModalSprint}>Cancelar</Button> 
                        <Button type='submit' variant='success'>Aceptar</Button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default ModalSprint