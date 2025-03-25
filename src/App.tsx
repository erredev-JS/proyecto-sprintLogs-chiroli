import styles from './components/screens/App.module.css'
import { Aside } from "./components/ui/Aside/Aside"
import { Header } from "./components/ui/Header/Header"
import { ListBacklog } from "./components/ui/ListBacklog/ListBacklog"




function App() {

  return (
    <>


      <Header></Header>
      <div className={styles.mainContainer}>

      <Aside></Aside>
      <ListBacklog></ListBacklog>
        
      </div>

    </>
  )
}

export default App
