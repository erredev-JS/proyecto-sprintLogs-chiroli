import { Button } from 'react-bootstrap'
import styles from './Aside.module.css'
import { SprintCard } from '../SprintCard/SprintCard'
import { useStoreModal } from '../../../store/useStoreModal'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useStoreSprints from '../../../store/useStoreSprints'
import { getAllSprintsController } from '../../../data/sprintController'




export const Aside = () => {

    const { openModalSprint} = useStoreModal()
    const {setSprints, sprints, setSprintActiva} = useStoreSprints()

    useEffect(()=>{

        const firstGetSprints = async () => {
            const response = await getAllSprintsController()
            setSprints(response ?? [])
            console.log(response);
            
        }


        firstGetSprints()

    }, [])

    const navigate = useNavigate();
    const handleClick = () => {
    navigate("/");
    setSprintActiva(null)
    };
    

    const handleOpenModalSprint = () => {
        setSprintActiva(null)
        openModalSprint()
    }

  return (
    <>
    <div className={styles.asideMain}>
        <div className={styles.backlogButton}>
                <Button className={styles.btnCustom} onClick={handleClick}>Backlog</Button>
            </div>
            <div className={styles.asideMainContainer}>
                <div className={styles.headerAside}>
                    <h3>Lista de sprints</h3>
                    <Button onClick={handleOpenModalSprint} className={styles.btnCustom}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z"/></svg>
                    </Button>
                </div>

                <div className={styles.cardContainer}>
                    {sprints.map((sprint) => <SprintCard key={sprint.id} sprintIn={sprint} />)}
                </div>
                
            </div>
    </div>
        
    </>
  )
}
