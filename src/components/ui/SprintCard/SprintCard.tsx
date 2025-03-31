import { Button } from 'react-bootstrap'
import styles from './SprintCard.module.css'
import viewIcon from '../../../assets/viewIcon.svg'
import editIcon from '../../../assets/editIcon.svg'
import deleteIcon from '../../../assets/deleteIcon.svg'

export const SprintCard = () => {

    const sprintEjample = {
        id: 1,
        name: "Sprint 1",
        startDate: "2023-01-01",
        endDate: "2023-01-31",
    }

  return (

    <div>
        <div className={styles.cardContainer}>

        <div className={styles.dataContainer}>
        <h2>{sprintEjample.name}</h2>
        <h3>Inicio: {sprintEjample.startDate}</h3>
        <h3>Cierre: {sprintEjample.endDate}</h3>
        <div className={styles.buttonContainer}>
                <Button className={styles.btnCustom}>
                    <img src={viewIcon} />
                </Button>
                <Button className={styles.btnCustom}>
                    <img src={editIcon} />
                </Button>
                <Button variant='danger' className={styles.btnCustomDelete}>
                <img src={deleteIcon} />
                </Button>
            </div>
        </div>
        </div>
    </div>
    
    
  )
}
