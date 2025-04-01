import { Button } from 'react-bootstrap'
import styles from './SprintCard.module.css'
import viewIcon from '../../../assets/viewIcon.svg'
import editIcon from '../../../assets/editIcon.svg'
import deleteIcon from '../../../assets/deleteIcon.svg'
import { useNavigate } from 'react-router-dom'

export const SprintCard = () => {

    const sprintEjample = {
        id: 1,
        name: "Sprint 1",
        startDate: "2023-01-01",
        endDate: "2023-01-31",
    }

    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/sprintScreen");
    };

  return (

    <div>
        <div className={styles.cardContainer} onClick={handleClick}>

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
