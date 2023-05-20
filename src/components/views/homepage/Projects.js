import { useEffect, useState } from "react";

// components
import CardProjects from "./projects/CardProjects";
import FormNewProject from "./projects/FormNewProject";

//utils
import { fetchObtenerProyectos } from "utils/fetchs";


export default function Projects() { 

    const [proyects, setProyects] = useState()
  useEffect( async () => {   
    const proyectsFromFetch = await fetchObtenerProyectos()
    setProyects(proyectsFromFetch)
  }, [])
  

  return (
    <>            
      <div className="flex flex-wrap">
        <div className="sm:w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 px-4 mb-3">
   
          <CardProjects model= "2x3_Coordination-View-RAC_basic_sample_project" name="HOUSE A" description="Default Revit File" />            
          { proyects?.map( proyect => 
             <CardProjects model= "Logotipo-Bimetica-flower" name={proyect.CptNombre} description={proyect.CtpDescripcion} />            
          )}
          <FormNewProject/>
          
         </div> 
     
          <div className="sm:w-full  md:w-1/3 ">
         
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-2 px-4 mb-3">
         
             
            </div>
          </div>
        </div>
             
    </>
  );
}
