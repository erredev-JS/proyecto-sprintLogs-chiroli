import { Button } from 'react-bootstrap'

import styles from './ModalCard.module.css'
import { useStoreModal } from '../../../store/useStoreModal'

export const ModalCard = () => {
    const { openTask, closeModalTask} = useStoreModal()

    if (!openTask) return null // Si es falso no renderiza
    

    
    return(
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>  
                <h2>Crear Tarea</h2>
            </div>
            <div>
                <form className={styles.containerForm} action="">
                    <input type="text" name="" id="" placeholder='Titulo'/>
                    <input type="text" name="" id="" placeholder='Fecha Inicio'/>
                    <input type="text" name="" id="" placeholder='Fecha Cierre'/>
                    <input type="text" name="" id="" placeholder='Descripcion'/>
                </form>
            </div>
            <div className={styles.containerButtons}>
                <Button variant='danger' onClick={closeModalTask}>Cancelar</Button> 
                <Button variant='success'>Aceptar</Button>
            </div>
        </div>
    )
}

