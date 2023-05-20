
import { useEffect, useState } from "react";


const PrivateRoute = ({children}) => {
  const baseUrl = process.env.REACT_APP_API_URL
  const [user, setUser] = useState('waiting')

  useEffect(() => {      
    fetch(`${baseUrl}/validar_usuario_node.php`, {
      "method": "POST",
    })
    .then(response => response.json())
    .then(
        json =>{setUser(json)}
    )
    .catch(err => {
      console.error(err);
    });
  }, [])
    
  
  return user === 'waiting'  ? children //se puede agregar un loading spinner o animacion de espera
    :  children  
    // : <Route  component={() => { 
    //   window.location.href =' '; 
    //   return null;
    //   }}/> 
}

export default PrivateRoute