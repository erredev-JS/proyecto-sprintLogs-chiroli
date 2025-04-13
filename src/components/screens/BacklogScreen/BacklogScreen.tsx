

import { useStoreModal } from "../../../store/useStoreModal"
import { Aside } from "../../ui/Aside/Aside"
import { Header } from "../../ui/Header/Header"
import { ListBacklog } from "../../ui/ListBacklog/ListBacklog"



import { ModalCard } from "../../ui/ModalCard/ModalCard"
import { ModalSendTaskToSprint } from "../../ui/ModalSendTaskToSprint/ModalSendTaskToSprint"

import ModalSprint from "../../ui/ModalSprint/ModalSprint"
import { ModalViewCard } from "../../ui/ModalViewCard/ModalViewCard"




import styles from './BacklogScreen.module.css'


export const BacklogScreen = () => {

  const {openViewTask, openTask, openSprint, openTaskSend } = useStoreModal()
  
    

  return (
    
    <>
        <Header></Header>
      <div className={styles.mainContainer}>

      <Aside></Aside>
      <ListBacklog/>
  
      </div>
      {openSprint && <ModalSprint/>}
      {openTask && <ModalCard/>}
      {openViewTask && <ModalViewCard/>}
      {openTaskSend && <ModalSendTaskToSprint/>}
      
      
      
    </>
  )
}
