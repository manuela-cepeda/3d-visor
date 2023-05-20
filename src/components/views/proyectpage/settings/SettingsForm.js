import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SettingsForm({params}) {  
  
  const baseUrl = process.env.REACT_APP_API_URL   //obtengo url para peticion desde archivo .env
  const id = parseInt(params.id)  //obtengo id desde url
  const [errors, setErrors] = useState({})
  const [formValues, setFormValues] = useState({   
    CtpCategoria: 0,
    CtpCiudad: "",
    CtpCodigop: "0",
    CtpDescripcion: "",
    CtpDireccion: "",
    CtpLod: 0,
    CptNombre: "",
    CtpPais: 0
  }) 
  //extraigo los valores para usarlo en el formulario
  const {CtpCategoria, CtpCiudad, CtpCodigop, CtpDescripcion, CtpDireccion, CtpLod, CptNombre, CtpPais } = formValues  

  //obtengo datos del proyecto y actualizo el initialForm (hacer peticion dentro de useEffect evita error uncaugth in promise )
  useEffect(() => {
    const fetchObtenerProtecto = async () => { 
      try{
        const response = await fetch(`${baseUrl}/obtener_proyecto_node.php?id=${id}` ) 
        const proyecto = await response.json()             
        if (response.ok) {
          setFormValues(proyecto)           
        } else {
          console.log('Respuesta de red OK pero respuesta de HTTP no OK')
        } 
      } catch (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message)
      }      
     }
     fetchObtenerProtecto()    
  }, [])

 //validacion del formulario 
  const validarForm = (target) => {      
    if(!target.value.trim()){     
      setErrors((errors) => ({
        ...errors,
        [ target.name ]: 'Este campo es obligatorio.'
      }));        
    } else if (target.value.length < target.minLength) {    
      setErrors((errors) => ({
        ...errors,
        [ target.name ]:  `Debe tener un mínimo de ${target.minLength} cáracteres.`
      }));        
    } 
    else {      
      delete errors[ target.name ]
      setErrors((errors) => ({
        ...errors         
      })); 
    }     
  }

  //guarda datos del formulario 
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [ target.name ]: target.value
    });
  }  
  //valida el input al escribirlo
  const handleOnBlur = ({target}) => { 
    validarForm(target)
  }

  //con el submit se hace un update en la base de datos 
  const  handleSubmit =  (e) => {
    e.preventDefault()  
    //chequeo los errores en todos los inputs
    const inputs = document.querySelectorAll("[required]")  
    inputs.forEach(input =>
      {console.log(input.value)
      validarForm(input) 
    })  

    //funcion para actualizar la BD (ver de pasar a carpeta utils/helpers con todos las funciones fetch)
    const fetchActualizarProyecto = async () => { 
      try{
        const response = await fetch(`${baseUrl}/actualizar_proyecto_node.php`,{
          method: "PUT",
          body: JSON.stringify(formValues)
        })        
        const exitoso = await response.text()
        if (exitoso && Object.keys(errors).length === 0 ) {          
          toast.success("Datos guardados");
        } else if(exitoso && Object.keys(errors).length !== 0) {
          toast.warning("Verifique que todos los datos estén completos");
        } else {
          toast.error("Error ");
        }
      } catch (error) {
        toast.error("Error");
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      }         
    //  fetchActualizarProyecto();  
    }
  }

 
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-slate-700 text-xl font-bold">{CptNombre} </h6>
            <button
              className="bg-orange-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleSubmit}
            >
              SAVE
            </button>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
              Project Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Name*
                  </label>
                  <input
                    type="text"
                    className={"px-3 py-3 placeholder-slate-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" + (errors.CptNombre ? " text-red-500  border-2 border-rose-600 " : "border-0   text-slate-600 " )}
                    name="CptNombre"
                    value={CptNombre }            
                    onChange={ handleInputChange } 
                    onBlur={handleOnBlur}
                    required
                    minLength={2}
                  />
                  {errors.CptNombre && <span className="text-xs text-red-500	">{errors.CptNombre}</span>}

                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Project Central File*
                  </label>
                  <input
                    type="file" id="formFileMultiple" multiple
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    PROJECT IMAGE
                  </label>
                  <input
                    type="file" id="formFileMultiple" multiple
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                    
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    COMPANY LOGO / BRAND
                  </label>
                  <input
                    type="file" id="formFileMultiple" multiple
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                    
                  />
                </div>
              </div>
             
            </div>

            <hr className="mt-6 border-b-1 border-slate-300" />

            <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
              Location
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className={"px-3 py-3 placeholder-slate-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" + (errors.CtpDireccion ? " text-red-500  border-2 border-rose-600 " : "border-0   text-slate-600 " )}
                    name="CtpDireccion"
                    value= {CtpDireccion }                  
                    onChange={ handleInputChange } 
                    onBlur={handleOnBlur}
                    required
                    minLength={2}
                  />
                  {errors.CtpDireccion && <span className="text-xs text-red-500	">{errors.CtpDireccion}</span>}
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                  City
                  </label>
                  <input
                    type="text"
                    className={"px-3 py-3 placeholder-slate-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" + (errors.CtpCiudad ? " text-red-500  border-2 border-rose-600 " : "border-0   text-slate-600 " )}
                    name="CtpCiudad"
                    value={ CtpCiudad }                
                    onChange={ handleInputChange } 
                    onBlur={handleOnBlur}
                    required
                    minLength={2}
                  />
                  {errors.CtpCiudad && <span className="text-xs text-red-500	">{errors.CtpCiudad}</span>}
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                  Country
                  </label>
                  <input
                    type="text"
                    className={"px-3 py-3 placeholder-slate-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" + (errors.CtpPais ? " text-red-500  border-2 border-rose-600 " : " border-0   text-slate-600 " )}
                    name="CtpPais"
                    value={CtpPais }                
                    onChange={ handleInputChange } 
                    onBlur={handleOnBlur}
                    required
                    minLength={2}
                  />
                  {errors.CtpPais && <span className="text-xs text-red-500	">{errors.CtpPais}</span>}                 
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className={"px-3 py-3 placeholder-slate-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" + (errors.CtpCodigop ? " text-red-500  border-2 border-rose-600 " : " border-0 text-slate-600 " )}
                    name="CtpCodigop"
                    value={CtpCodigop }                
                    onChange={ handleInputChange }
                    onBlur={handleOnBlur}
                    required
                    minLength={2}
                  />
                  {errors.CtpCodigop && <span className="text-xs text-red-500	">{errors.CtpCodigop}</span>}                     
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-slate-300" />

            <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
            PROJECT SCOPE
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                   Details
                  </label>
                  <textarea
                    type="text"
                    className={"px-3 py-3 placeholder-slate-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" + (errors.CtpDescripcion ? " text-red-500  border-2 border-rose-600 " : " border-0 text-slate-600 " )}
                    placeholder="Describe the scope of work for the project "
                    name="CtpDescripcion"
                    value={CtpDescripcion }                
                    onChange={ handleInputChange } 
                    rows="4"
                    onBlur={handleOnBlur}
                    required
                    minLength={2}
                  />
                  {errors.CtpDescripcion && <span className="text-xs text-red-500	">{errors.CtpDescripcion}</span>}   
                </div>
              </div>
              
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Categoría
                  </label>
                  <select 
                  className={"px-3 py-3 placeholder-slate-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" + (errors.CtpCategoria ? " text-red-500  border-2 border-rose-600 " : " border-0 text-slate-600 " )}
                  name="CtpCategoria"
                  value={CtpCategoria }                
                  onChange={ handleInputChange } 
                  onBlur={handleOnBlur}
                  required
                 
                >
                {errors.CtpCategoria && <span className="text-xs text-red-500	">{errors.CtpCategoria}</span>}   
                    <option value='' > Seleccione </option>
														<option value='7'  >Circulación</option>
														<option value='4'  >Comercio</option>
														<option value='5'  >Deportivo</option>
														<option value='6'  >Detalles Constructivos</option>
														<option value='2'  >Fachadas</option>
														<option value='8'  >Institucionales</option>
														<option value='9'  >Militares</option>
														<option value='3'  >Oficinas</option>
														<option value='11'  >Paisajismo</option>
														<option value='12'  >Religioso</option>
														<option value='1'  >Residencia</option>
														<option value='10'  >Rural</option>
														<option value='13'  >Urbano</option>
			          </select>
                </div>

              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    LOD
                  </label>
                	<select  
                  className={"px-3 py-3 placeholder-slate-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" + (errors.CtpLod ? " text-red-500  border-2 border-rose-600 " : " border-0 text-slate-600 " )}
                  name="CtpLod"
                  value={CtpLod }                
                  onChange={ handleInputChange } 
                  onBlur={handleOnBlur}
                  required                 
                >
                {errors.CtpLod && <span className="text-xs text-red-500	">{errors.CtpLod}</span>}  
                <option value='' > Seleccione </option>
														<option value='14'  >LOD 100</option>
														<option value='15'  >LOD 200</option>
														<option value='16'  >LOD 300</option>
														<option value='17'  >LOD 400</option>
														<option value='18'  >LOD 500</option>
			          	</select>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Situación
                  </label>
                  <select id='estado' name='estado'  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  aria-required='true' aria-invalid='false'   required>
                <option value='' > Seleccione </option>
														<option value='20'  >Nuevo proyecto</option>
														<option value='19'  >Reforma/rehabilitación</option>
			        	</select>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Metros cuadrados
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=" "
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Valor €
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                   Iniciativa
                  </label>
                  <select id='iniciativa' name='iniciativa' className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" aria-required='true' aria-invalid='false'   required>
                <option value='' > Seleccione </option>
														<option value='32'  >Mixta</option>
														<option value='31'  >Privado</option>
														<option value='30'  >Público</option>
			          	</select>
                </div>
              </div>

              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-slate-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                   Estado
                  </label>
                  <select id='iniciativa' name='iniciativa' className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" aria-required='true' aria-invalid='false'   required>
                <option value='' > Seleccione </option>
														<option value='32'  >Activo</option>													
														<option value='30'  >Finalizado</option>
			          	</select>
                </div>
              </div>




            </div>

            <hr className="mt-6 border-b-1 border-slate-300" />

            <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
            PROJECT PHASES
            </h6>
            <table className=" ml-3 divide-y divide-slate-200 text-left w-full table-fixed">
              <thead>
                <tr>
                  <th>Phase Name</th>
                  <th>Date Created</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Phase 0</td>
                  <td>02.02.2022</td>
                  <td>31.12.2022</td>
                </tr>               
              </tbody>
            </table>
               <div className="mt-5 flex flex-wrap">
              <div className="  w-full lg:w-4/12 px-2">
                <div className="relative w-full mb-3">
                   <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="New Phase"
                  />
                   </div>
                   </div>
                   <div className="w-full lg:w-4/12 px-2">
                   <div className="relative w-full mb-3">
                   <input
                     type="date"
                    className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue="Date Created"
                  />
                    </div>
                   </div>
                    <div className="w-full lg:w-4/12 px-2">
                    <div className="relative w-full mb-3">
                    <input
                       type="date"
                      className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      defaultValue="Due Date"
                    />
                    </div>
                    </div>
                  </div>
                  <div className="text-center"> 
                  <button
              className="bg-orange-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              ADD PHASE
            </button>

                  </div>
          </form>
        </div>
      </div>
      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      
    </>
  );
}
