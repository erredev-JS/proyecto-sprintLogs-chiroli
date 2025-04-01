import { Button } from 'react-bootstrap'
import styles from './SprintCard.module.css'
import viewIcon from '../../../assets/viewIcon.svg'
import editIcon from '../../../assets/editIcon.svg'
import deleteIcon from '../../../assets/deleteIcon.svg'
import { useNavigate } from 'react-router-dom'
import { FC } from 'react'
import useStoreSprints from '../../../store/useStoreSprints'
import { ISprint } from '../../../types/ISprints'


type ISprintCard = {
    sprintIn: ISprint
}

export const SprintCard: FC<ISprintCard> = ({sprintIn}) => {

    const {setSprintActiva} = useStoreSprints()

    const navigate = useNavigate();
    const handleClick = () => {
      setSprintActiva(sprintIn)
      navigate("/sprintScreen");
    };

  return (

    <div>
        <div className={styles.cardContainer}>

        <div className={styles.dataContainer}>
        <h2 onClick={handleClick}>{sprintIn.nombre}</h2>
        <h3 onClick={handleClick}>Inicio: {sprintIn.fechaInicio}</h3>
        <h3 onClick={handleClick}>Cierre: {sprintIn.fechaCierre}</h3>
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
