import { Button } from 'react-bootstrap'
import useStoreTareas from '../../../store/useStoreTareas'
import styles from './ModalViewCard.module.css'
import { useStoreModal } from '../../../store/useStoreModal'

export const ModalViewCard = () => {
    const {tareaActiva, setTareaActiva} = useStoreTareas()
    const {closeModalViewTask} = useStoreModal()

    
    const handleCloseModalView = () => {
        setTareaActiva(null)
        closeModalViewTask()
    }

    return(
        <div className={styles.containerBackdropFilter}>
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTitle}> 
                    <p>Titulo : {tareaActiva?.titulo}</p>
                </div>
                <div className={styles.containerDescription}>
                    <p>Descripcion: {tareaActiva?.descripcion}</p>
                </div>
                <div className={styles.containerFecha}>
                    <p>Fecha Cierre: {tareaActiva?.fechaLimite}</p>
                </div>
                <div className={styles.containerButton}>
                    <Button variant='danger' onClick={handleCloseModalView}>Cerrar</Button>
                </div>
            </div>
        </div>
       
    )
}