import { useStoreModal } from '../../../store/useStoreModal'
import useStoreSprints from '../../../store/useStoreSprints'
import { Aside } from '../../ui/Aside/Aside'
import { Header } from '../../ui/Header/Header'
import { ListSprint } from '../../ui/ListSprint/ListSprint'
import { ModalCard } from '../../ui/ModalCard/ModalCard'
import ModalSprint from '../../ui/ModalSprint/ModalSprint'

import styles from './SprintScreen.module.css'

export const SprintScreen = () => {

    const {openTask, openSprint} = useStoreModal()
    const {setSprintActiva} = useStoreSprints()

  return (
    <div>
      <Header/>
      <div className={styles.mainContainer}>
        <Aside/>
        <ListSprint/>
      </div>
      {openTask && <ModalCard/>} 
      {openSprint && <ModalSprint/>}
    </div>
  )
}
