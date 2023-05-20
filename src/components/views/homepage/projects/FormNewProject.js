
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function FormNewProject() {
  const history = useHistory();
  const [showForm, setShowForm] =useState(false); 
  const [formValues, setFormValues] =useState({
    proyName: ''  
  }); 
 

  const {proyName} = formValues
  const baseUrl = process.env.REACT_APP_API_URL

    //guarda datos del formulario 
    const handleInputChange = ({ target }) => {
      setFormValues({
        ...formValues,
        [ target.name ]: target.value
      });
    } 

  const  handleSubmit =  async (e) => {
    e.preventDefault()     
    const response = await fetch(`${baseUrl}/crear_proyecto_node.php`, {
      method: "POST",
      body: JSON.stringify(formValues)
    })
    const idProyCreado = await response.json() 
    if(idProyCreado) {
      const {CptId} = idProyCreado      
      history.push(`/projectpage/settings/${CptId}`)
      
    }else {
      console.log('error creando proyecto')
    } 
  } 

  return (
    <>
    { !showForm
     ? 
      <div  
      className="hover:border-orange-500 hover:border-solid hover:bg-white hover:text-orange-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium mb-6  py-32 cursor-pointer"
      onClick={() => setShowForm(true)}
      >
        <i className="fas fa-plus"></i>
        New project 
      </div>      
      :
      <> 
        <div className="relative hover:scale-105 ease-in-out duration-300 overflow-hidden break-words bg-white w-full mb-6 shadow-xl rounded-lg ">                   
            <img
              alt="..."
            src={ require(`assets/img/3d-default.png`).default} 
              className=" h-48	 object-cover align-middle w-full border-none "
            />
            
            <div className="w-full px-4 my-3 ">
             <div className=" border-b border-gray-500 py-1 ">
               <input className="text-blueGray-400 appearance-none focus:outline-none border-none w-full"
                name="proyName"
                placeholder="Proyect Name"
                value={proyName}                
                onChange={ handleInputChange } />                
              </div>

              <div className="flex items-center text-xs mt-4">          
                <button
                className="bg-orange-500 text-white active:bg-orange-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleSubmit}
                >
                Save Changes
                </button>
                <button
                className="text-red-500 background-transparent font-bold uppercase px-4 py-2  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={()=>{  setShowForm(false)}}
                >
                Close
                </button>
              </div>          
            </div>          
        </div>
      </>
        
       
      }
    </>
  );
}