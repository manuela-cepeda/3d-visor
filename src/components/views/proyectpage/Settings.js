
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// components
import SettingsForm from "./settings/SettingsForm";
import SettingsInfo from "./settings/SettingsInfo";


export default function Settings() {
  //obtengo el parametro de url 
  let params = useParams()
   //obtengo url para peticion desde archivo .env
   const baseUrl = process.env.REACT_APP_API_URL
   //obtengo id desde url 
   const id = parseInt(params.id)
   //declaro los valores iniciales del formulario (los edito con lo que obtengo de fetchObtenerProtecto)
   const [proyValues, setProyValues] = useState({   
     CtpCategoria: 0,
     CtpCiudad: "",
     CtpCodigop: "0",
     CtpDescripcion: "",
     CtpDireccion: "",
     CtpLod: 0,
     CptNombre: "",
     CtpPais: 0
   })  

   
   //hoock de React: ejecuta lo que esta adentro cuando el componenete termina de renderizarse
   //hacer peticion dentro evita error uncaugth in promise   
   useEffect(() => {    
     //obtengo datos del proyecto y actualizo el initialForm
     const fetchObtenerProtecto = async () => { 
       try{
         const response = await fetch(`${baseUrl}/obtener_proyecto_node.php?id=${id}` ) 
         const proyecto = await response.json()             
           if (response.ok) {
            setProyValues(proyecto) 
             
           } else {
             console.log('Respuesta de red OK pero respuesta de HTTP no OK');
           } 
       } catch (error) {
         console.log('Hubo un problema con la petición Fetch:' + error.message);
       }      
      }
      fetchObtenerProtecto()
     
   }, [])

  return (
    <>
      <div className="flex flex-wrap" >
        <div className="w-full lg:w-8/12 px-4">
          <SettingsForm params={params} /> 
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <SettingsInfo  proyValues={proyValues} />
        </div>
      </div>
    </>
  );
}
