
export default function CardUser() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src={require("assets/img/perfil.png").default}
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
           
          </div>
          <div className="text-center mt-16">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-slate-700 mb-2">
            Name: Jane 
            </h3>
     {/*        <div className="mb-2 text-slate-600 ">
              <i className="fas fa-briefcase mr-2 text-lg text-slate-400"></i>
              Bimetica
            </div> */}
            <div className="mb-2 text-slate-600 ">
              <i className="fas fa-briefcase mr-2 text-lg text-slate-400"></i>
              Profession: <br/> Architect
            </div>
            <div className="mb-2 text-slate-600 ">
              <i className="fas fa-envelope mr-2 text-lg text-slate-400"></i> 
              Contact: cristobalb@bimetica.com            
              </div>
           
          </div>
          <div className="mt-10 py-5 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-slate-700">
                Amount of Space use
                </p>
                <h3 className="text-xl font-semibold leading-normal mb-2 text-slate-700 mb-2">
                  50 % 
                </h3>
                <a
                  href="#pablo"
                  className="font-normal text-orange-500"
                  onClick={(e) => e.preventDefault()}
                >
                  Buy more
                </a>
              </div>
            </div>
          </div>

          <div className="my-5 py-5 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-slate-700">
                Invoicing Details
                </p>
                
                <a
                  href="..."
                  className="font-normal text-orange-500"
                  onClick={(e) => e.preventDefault()}
                >
                 Invoices available
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
