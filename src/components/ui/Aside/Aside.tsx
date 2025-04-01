import { Button } from 'react-bootstrap'
import styles from './Aside.module.css'
import { SprintCard } from '../SprintCard/SprintCard'
import { useStoreModal } from '../../../store/useStoreModal'
import { useNavigate } from 'react-router-dom'




export const Aside = () => {

    const { openModalSprint } = useStoreModal()

    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/");
    };
    

  return (
    <>
    <div className={styles.asideMain}>
        <div className={styles.backlogButton}>
                <Button className={styles.btnCustom} onClick={handleClick}>Backlog</Button>
            </div>
            <div className={styles.asideMainContainer}>
                <div className={styles.headerAside}>
                    <h3>Lista de sprints</h3>
                    <Button onClick={openModalSprint} className={styles.btnCustom}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z"/></svg>
                    </Button>
                </div>

                <div className={styles.cardContainer}>
                    <SprintCard></SprintCard>
                </div>
            </div>
    </div>
        
    </>
  )
}
