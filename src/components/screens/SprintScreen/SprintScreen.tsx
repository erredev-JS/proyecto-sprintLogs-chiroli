import { Aside } from '../../ui/Aside/Aside'
import { Header } from '../../ui/Header/Header'
import { ListSprint } from '../../ui/ListSprint/ListSprint'
import { ModalCard } from '../../ui/ModalCard/ModalCard'

import styles from './SprintScreen.module.css'

export const SprintScreen = () => {
  return (
    <div>
      <Header/>
      <div className={styles.mainContainer}>
        <Aside/>
        <ListSprint/>
      </div>
      <ModalCard/>
    </div>
  )
}
