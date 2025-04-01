import { Button } from 'react-bootstrap'
import styles from './SprintCard.module.css'
import viewIcon from '../../../assets/viewIcon.svg'
import editIcon from '../../../assets/editIcon.svg'
import deleteIcon from '../../../assets/deleteIcon.svg'
import { useNavigate } from 'react-router-dom'
import { ISprint } from '../../../types/ISprints'
import { FC } from 'react'
import useStoreSprints from '../../../store/useStoreSprints'


type ISprintCard = {
    sprintIn: ISprint
}

export const SprintCard: FC<ISprintCard> = ({sprintIn}) => {

    const {setSprintActiva} = useStoreSprints()

    const navigate = useNavigate();
    const handleClick = () => {
      navigate("/sprintScreen");
      setSprintActiva(sprintIn)
    };

  return (

    <div>
        <div className={styles.cardContainer} onClick={handleClick}>

        <div className={styles.dataContainer}>
        <h2>{sprintIn.nombre}</h2>
        <h3>Inicio: {sprintIn.fechaInicio}</h3>
        <h3>Cierre: {sprintIn.fechaCierre}</h3>
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
