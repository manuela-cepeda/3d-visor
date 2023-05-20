import React, {memo, useEffect, useRef } from "react";
import { Color } from "three";
import { IfcViewerAPI } from "web-ifc-viewer"; 



const ViewerMin = () => {

  const viewerRef = useRef();



  useEffect(() => {     
    
    const frag = window.location.hash.substr(1).split('#');
    const [model, ] = frag
  
    const container = document.getElementById("local-ifc-container");
    const viewerAPI = new IfcViewerAPI({ container,  backgroundColor: new Color(0xE6E5DD)  });
    
    viewerAPI.addAxes();
    viewerAPI.addGrid();
    viewerAPI.IFC.setWasmPath("../../../");
    viewerAPI.IFC.loader.ifcManager.applyWebIfcConfig({
      COORDINATE_TO_ORIGIN: true,
      USE_FAST_BOOLS: true
    });
    viewerRef.current = viewerAPI;
    const loadIfc = async (ifcFileRuta) => { 
    const model = await viewerRef.current.IFC.loadIfcUrl(ifcFileRuta, true);     
    }
   
    loadIfc(`../../../${model}.ifc`)      
    // loadIfc(`/node/${model}.ifc`)      
    

    

  }, []);


  

 
  return (
    <>


          <div className="col-span-2 bg-white  mb-6 shadow-lg rounded overflow-hidden">
            <div      
            id="local-ifc-container"
            style={{       
              position: "relative",
              height: "50vh",
              width: "120%",
            }} >
           
           </div>
              
          </div>
          

   
    </>
  );
};

export default memo(ViewerMin);
