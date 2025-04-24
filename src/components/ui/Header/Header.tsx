import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css'


export const Header = () => {
  // Importaciones React-router
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  
  return (
    <div className={styles.containerHeader}>
      <h1 onClick={handleClick}>AdminTareas</h1>
    </div>
  )
}
