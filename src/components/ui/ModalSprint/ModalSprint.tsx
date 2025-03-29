import { Button } from 'react-bootstrap'
import styles from './ModalSprint.module.css'
import { useStoreModal } from '../../../store/useStoreModal'





const ModalSprint = () => {

    let {openSprint, closeModalSprint} = useStoreModal()

    if (!openSprint) return null // Si es falso no renderiza
  
    return(
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>  
                <h2>Crear Sprint</h2>
            </div>
            <div>
                <form className={styles.containerForm} action="">
                    <input type="text" name="" id="" placeholder='Titulo'/>
                    <input type="text" name="" id="" placeholder='Fecha Inicio'/>
                    <input type="text" name="" id="" placeholder='Fecha Cierre'/>
                </form>
            </div>
            <div className={styles.containerButtons}>
                <Button variant='danger' onClick={closeModalSprint}>Cancelar</Button> 
                <Button variant='success'>Aceptar</Button>
            </div>
        </div>
    )
}

export default ModalSprint