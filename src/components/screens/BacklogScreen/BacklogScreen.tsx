

import { Aside } from "../../ui/Aside/Aside"
import { Header } from "../../ui/Header/Header"
import { ListBacklog } from "../../ui/ListBacklog/ListBacklog"

import { ModalCard } from "../../ui/ModalCard/ModalCard"

import ModalSprint from "../../ui/ModalSprint/ModalSprint"
import { ModalViewCard } from "../../ui/ModalViewCard/ModalViewCard"




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
      <ModalViewCard />
      
      
      
    </>
  )
}
