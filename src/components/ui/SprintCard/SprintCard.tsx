import { Button } from 'react-bootstrap'
import styles from './SprintCard.module.css'
import viewIcon from '../../../assets/viewIcon.svg'
import editIcon from '../../../assets/editIcon.svg'
import deleteIcon from '../../../assets/deleteIcon.svg'
import { useNavigate } from 'react-router-dom'
import { FC } from 'react'
import useStoreSprints from '../../../store/useStoreSprints'
import { ISprint } from '../../../types/ISprints'
import Swal from 'sweetalert2'
import { eliminateSprintController } from '../../../data/sprintController'


type ISprintCard = {
    sprintIn: ISprint
}

export const SprintCard: FC<ISprintCard> = ({sprintIn}) => {

    const {setSprintActiva, deleteSprint} = useStoreSprints()

    const navigate = useNavigate();
    const handleClick = () => {
      setSprintActiva(sprintIn)
      navigate("/sprintScreen");
    };

    const handleDeleteSprint = () => {
        const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true
    });
    swalWithBootstrapButtons.fire({
      title: "¿Eliminar Sprint?",
      text: "Esta accion no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          
          title: "Borrada!",
          text: "La tarea ha sido eliminada.",
          icon: "success"
        });
        eliminateSprintController(sprintIn.id)
        deleteSprint(sprintIn.id)
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: ``,
          icon: "error"
        });
      }
    });
      }

  return (

    <div>
        <div className={styles.cardContainer}>

        <div className={styles.dataContainer}>
        <h2 onClick={handleClick}>{sprintIn.nombre}</h2>
        <h3>Inicio: {sprintIn.fechaInicio}</h3>
        <h3>Cierre: {sprintIn.fechaCierre}</h3>
        <div className={styles.buttonContainer}>
                <Button className={styles.btnCustom}>
                    <img src={viewIcon} />
                </Button>
                <Button className={styles.btnCustom}>
                    <img src={editIcon} />
                </Button>
                <Button onClick={handleDeleteSprint} variant='danger' className={styles.btnCustomDelete}>
                <img src={deleteIcon} />
                </Button>
            </div>
        </div>
        </div>
    </div>
    
    
  )
}
