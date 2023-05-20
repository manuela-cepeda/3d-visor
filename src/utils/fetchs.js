 //obtengo url para peticion desde archivo .env
 const baseUrl = process.env.REACT_APP_API_URL

 export async function fetchObtenerProyectos() {

  try {
    const response = await fetch(`${baseUrl}/obtener_proyectos_node.php`)
    const proyects = await response.json();
    if (response.ok) {
      return proyects          
    } else {
      console.log('Respuesta de red OK pero respuesta de HTTP no OK');
    }         
  } catch (error) {
    console.log('Hubo un problema con la petición Fetch:' + error.message);
  }
} 


export const fetchObtenerProyecto = async (id) => { 
    try{
      const response = await fetch(`${baseUrl}/obtener_proyecto_node.php?id=${id}` ) 
      const proyect = await response.json()             
        if (response.ok) {
            return proyect          
        } else {
          console.log('Respuesta de red OK pero respuesta de HTTP no OK');
        } 
    } catch (error) {
      console.log('Hubo un problema con la petición Fetch:' + error.message);
    }      
   }