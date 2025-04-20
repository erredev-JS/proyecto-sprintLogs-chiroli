import { useStoreModal } from '../../../store/useStoreModal'

import { Aside } from '../../ui/Aside/Aside'
import { Header } from '../../ui/Header/Header'
import { ListSprint } from '../../ui/ListSprint/ListSprint'
import { ModalCard } from '../../ui/ModalCard/ModalCard'
import ModalSprint from '../../ui/ModalSprint/ModalSprint'
import { ModalViewCard } from '../../ui/ModalViewCard/ModalViewCard'

import styles from './SprintScreen.module.css'

export const SprintScreen = () => {

  const {openViewTask, openTask, openSprint} = useStoreModal()
    

    

  return (
    <div>
      <Header/>
      <div className={styles.mainContainer}>
        <Aside/>
        <ListSprint/>
      </div>
      {openSprint && <ModalSprint/>}
      {openTask && <ModalCard/>}
      {openViewTask && <ModalViewCard/>}

      
    </div>
  )
}
