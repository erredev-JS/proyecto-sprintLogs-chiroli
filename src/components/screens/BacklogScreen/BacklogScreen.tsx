
import { Aside } from "../../ui/Aside/Aside"
import { Header } from "../../ui/Header/Header"
import { ListBacklog } from "../../ui/listBacklog/ListBacklog"
import { ModalCard } from "../../ui/ModalCard/ModalCard"

import ModalSprint from "../../ui/ModalSprint/ModalSprint"



import styles from './BacklogScreen.module.css'


export const BacklogScreen = () => {

  return (
    
    <>
        <Header></Header>
      <div className={styles.mainContainer}>

      <Aside></Aside>
      <ListBacklog></ListBacklog>
  
      </div>
      <ModalSprint/>
      <ModalCard/>
    </>
  )
}
