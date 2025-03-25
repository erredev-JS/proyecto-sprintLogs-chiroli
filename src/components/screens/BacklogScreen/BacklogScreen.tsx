import { useState } from "react"
import { Aside } from "../../ui/Aside/Aside"
import { Header } from "../../ui/Header/Header"
import { ListBacklog } from "../../ui/listBacklog/ListBacklog"



import styles from './BacklogScreen.module.css'
import ModalSprint from "../../ui/ModalSprint/ModalSprint"

export const BacklogScreen = () => {
  const [modalAddSprint, setModalAddSprint] = useState(false) // Esatdo que muestra el modal, inicializa en false

  return (
    
    <>
        <Header></Header>
      <div className={styles.mainContainer}>

      <Aside showModal={() => setModalAddSprint(true)}></Aside>
      <ListBacklog></ListBacklog>
      {modalAddSprint && <ModalSprint showModal={() => setModalAddSprint(false)}/>}
        
      </div>
    </>
  )
}
