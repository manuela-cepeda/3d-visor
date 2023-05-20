import React, {  useContext, useEffect, useRef, useState } from "react";

import { IfcViewerAPI } from "web-ifc-viewer";
import {  Color } from "three";

import './Viewer.css';
import { getAllIds, getSpacialStructure, getWholeSubset, replaceOriginalModelBySubset, setupEvents, handleMove, handleZoom, handleRotate, handleFullscreen, handleGrid, handleOrto, handleClipping, setUpMultiThreading, loadIfc, handleSelect } from "utils/IFCJSfunctions";

import ViewerContextMenu from "./ViewerContextMenu";
import CommentContextMenu from "./CommentContextMenu";
import { ViewerContext } from "context/ViewerContext";
import { MeshLambertMaterial } from "three";



const Viewer = ({model}) => {

   /*************SET UP SCENE AND LOADING MODEL *******************/
  //se hace dentro del useEffect para que lo haga luego de renderizar la pagina (fuera no funciona)
  useEffect(async () => {
  //SETUP VIEWER CONFIG
    const container = document.getElementById("local-ifc-container");
    const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xE6E5DD) });   
    //configuraicion visor
    viewer.IFC.selector.preselection.material = new MeshLambertMaterial({
      transparent: true,
      opacity: 0.4,
      color: 0xF0905E,
      depthTest: false
    });
    viewer.IFC.selector.selection.material = new MeshLambertMaterial({
      transparent: true,
      opacity: 0.8,
      color: 0xF0905E,
      depthTest: false
  });
    viewer.addAxes();
    viewer.IFC.loader.ifcManager.applyWebIfcConfig({ COORDINATE_TO_ORIGIN: true, USE_FAST_BOOLS: true});
    setUpMultiThreading(viewer)
    viewer.clipper.active = false;

    //LOAD IFC FILE AND SET PROGRESS

    // const ifcModel = await loadIfc(`../../../${model}.ifc`, viewer) 
    const ifcModel = await loadIfc(`../../../${model}.ifc`, viewer) 
    
    getSpacialStructure(ifcModel, setTree);
    const allIDs =  getAllIds(ifcModel, setAllIDs);      
    const subset = await getWholeSubset(viewer, ifcModel, allIDs);
    replaceOriginalModelBySubset(viewer, ifcModel, subset);
    setupEvents(viewer, container, allIDs, setSelectedID); 

    //ADD ELEMENTS AS REFERENCE/ STATE
    containerRef.current = container;
    setViewer(viewer)
    setModelID(ifcModel.modelID)


    /************Memory back to start on unmount? **************/
    return async () => {
      await viewer.dispose();
      viewer = null;
    }

  }, []);

  //traigo funciones y estados globales del viewerContext
  const {setAllIDs, setTypeProps,  setTree, setModelID, setSelectedID, selectedID, setCategorySelected, modelID}= useContext(ViewerContext);

  const { viewer, setViewer }= useContext(ViewerContext); 
  const {showComment, setShowComment }= useContext(ViewerContext); 

    const containerRef = useRef() 

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);
  

//no va
  const handleNewFile = async  () => { 
    // loadIfc(`../../../room.blend.ifc`)
    const data = await viewer.IFC.loader.ifcManager.ifcAPI.GetAllLines(modelID)
    console.log(data )
      }

    


   //context menu
   const handleContextMenu = (e) => {
    e.preventDefault()
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    setShowMenu(true);
    setShowComment(false)
  }; 
  

  return (
    <>     
      <div className=" relative col-span-2 bg-white   shadow-lg  overflow-hidden"
        onContextMenu={handleContextMenu}
        onClick={()=>setShowMenu(false)}
        >
      
        {/*context menu  */}
        <div className="bg-white min-w-32 min-h-32 m-2 rounded text-base z-50 float-left "  
        style={{               
            position: "fixed",            
            top: anchorPoint.y + 'px',
            left: anchorPoint.x + 'px',          
          }} 
      >
          
        {showMenu && <ViewerContextMenu   /> } 
        { showComment && <CommentContextMenu  />} 
        </div>
        <div   
          onDoubleClick={()=>handleSelect(viewer, setSelectedID, setTypeProps, setCategorySelected)}             
          id="local-ifc-container"
          style={{
            position: "relative",
            height: "80vh",
            width: "70vw",
          }} >         
          {/* botones */}
          <div className="absolute m-2 inline-flex text-xs  shadow-sm  opacity-80" role="group">     

            <button
              onClick={() => handleMove(viewer, containerRef.current)}
              type="button" className="py-2 px-4  font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700  transition  duration-150   ease-in-out" id="moveBtn" data-tooltip-target="tooltip-default" title="Move" data-bs-placement="bottom" data-popper-arrow>
              <i className="fas fa-arrows-alt"></i>

            </button>
            <button
              onClick={() => handleRotate(viewer, containerRef.current)}
              type="button" className="py-2 px-4 font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700  transition  duration-150   ease-in-out" id="rotateBtn" data-tooltip-target="tooltip-default" title="Rotate" data-bs-placement="bottom" data-popper-arrow>
              <i className="fas fa-sync-alt"></i>
            </button>

            <button
              onClick={() => handleZoom(viewer, containerRef.current) }
              type="button" className="py-2 px-4 font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700  transition  duration-150   ease-in-out" id="zoomBtn" data-tooltip-target="tooltip-default" title="Zoom" data-bs-placement="bottom" data-popper-arrow>
              <i className="fas fa-search"></i>
            </button>

            <button
              onClick={() => handleFullscreen (containerRef.current) }
              type="button" className="py-2 px-4 font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700  transition  duration-150   ease-in-out" id="fullscreenBtn" data-tooltip-target="tooltip-default" title="Fullscreen" data-bs-placement="bottom" data-popper-arrow>
              <i className="fas fa-expand"></i>
            </button>

            <button
              onClick={ () => handleGrid(viewer) }
              type="button" className="py-2 px-4 font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700  transition  duration-150   ease-in-out" id="gridBtn" data-tooltip-target="tooltip-default" title="Grid" data-bs-placement="bottom" data-popper-arrow>
              <i className="fas fa-border-all"></i>
            </button>

            <button
              onClick={() => handleOrto(viewer) }
              type="button" className="py-2 px-4 font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700  transition  duration-150   ease-in-out" id="ortoBtn" data-tooltip-target="tooltip-default" title="Ortogonal view" data-bs-placement="bottom" data-popper-arrow>
              <i className="fas fa-cube"></i>
            </button>

            <button
              onClick={ () => handleClipping(viewer) }
              type="button" className="py-2 px-4 font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700  transition  duration-150   ease-in-out" id="clippingBtn" data-tooltip-target="tooltip-default" title="Clipping plane" data-bs-placement="bottom" data-popper-arrow>
              <i className="fas fa-vector-square"></i>
            </button>

            <button 
            onClick={handleNewFile}
            type="button" className="py-2 px-4 font-medium text-gray-900 bg-white border rounded-r-lg border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-2 focus:ring-orange-700 focus:text-orange-700  transition  duration-150   ease-in-out" id="infoBtn" data-tooltip-target="tooltip-default" title="Information" data-bs-placement="bottom" data-popper-arrow>
              <i className="fas fa-info"></i>
            </button>
            


          </div>              
        </div>

        {/* loading  */}
        <div id="loading-overlay" className="loading-overlay hidden">
          <h1 id="loading-progress" className="loading-progress"></h1>
        </div>

      </div>
      
        

    
    </>
  );
};

export default Viewer;
