import ProgressBar from "components/common/ProgressBar";


export default function SettingsInfo({proyValues}) {

  console.log(proyValues)
   //extraigo los valores para usarlo en el formulario
   const {CtpCategoria, CtpCiudad, CtpCodigop, CtpDescripcion, CtpDireccion, CtpLod, CptNombre, CtpPais } = proyValues

   const enlace = "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=es&amp;q=Quimica%203,08038,barcelona,spain+(proyecto)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
        <div className="px-6">
        
          <div className="text-center mt-5">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-slate-700 mb-2">
              Project Current Status
            </h3>
            {/* <div className="mb-2 text-slate-600 ">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-slate-400"></i>
                Location
            </div> */}        
           
          </div>
          <div className="mt-10 py-5 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-slate-700">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-slate-400"></i>
                Location
                </p>
              </div>
              <div className="w-full"><iframe width="100%" height="300"  scrolling="no" marginHeight="0" marginWidth="0" src={enlace}></iframe>
                  </div>
            </div>
          </div>

          <div className="mt-5 py-5 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-slate-700">
                Project Current Status
                </p>                
                 <ProgressBar  progressPercentage={50} />
              
              </div>
            </div>
          </div>


          <div className="my-5 py-5 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-slate-700">
                Collaborators
                </p>
                <div className="mb-4"> 
                  <p className=" text-sm leading-relaxed text-slate-700" > Owner: 1</p> 
                  <p className=" text-sm leading-relaxed text-slate-700" > Administrator: 1</p> 
                  <p className=" text-sm leading-relaxed text-slate-700" >   Project Manager: 5</p> 
                  <p className=" text-sm leading-relaxed text-slate-700" > Professionals:0</p> 
                  <p className=" text-sm leading-relaxed text-slate-700" >  Service Providers:0</p> 
                  <p className=" text-sm leading-relaxed text-slate-700" >  Manufacturers: 0</p> 
                  </div>
                <a
                  href="..."
                  className="font-normal text-orange-500"
                  onClick={(e) => e.preventDefault()}
                >
                 See more
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
