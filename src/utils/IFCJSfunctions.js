import cameraControls from 'camera-controls';
import { GridHelper } from 'three';

/********** FUNCIONES RELACIONADAS AL USO WEB-IFC-VIEWER (obtenidas de su documentacion) **********/
export async function setUpMultiThreading(viewer) {
  await viewer.IFC.setWasmPath("./");
  await viewer.IFC.loader.ifcManager.useWebWorkers(true, './IFCWorker.js');
}
   
export async function loadIfc(ifcFileRuta, viewer) {
  //PROGRESS     
  const overlay = document.getElementById('loading-overlay');
  const progressText = document.getElementById('loading-progress');
  overlay.classList.remove('hidden');
  progressText.innerText = `Loading`;

  viewer.IFC.loader.ifcManager.setOnProgress((event) => {
    const percentage = Math.floor((event.loaded * 100) / event.total);
    progressText.innerText = `Loaded ${percentage}%`;
  });
  const ifcModel = await viewer.IFC.loadIfcUrl(ifcFileRuta, true);

  // await viewer.shadowDropper.renderShadow(ifcModel.modelID);
  overlay.style.display = "none"

  return ifcModel;

}


export async function getSpacialStructure(ifcModel, setTree)  {
    const modelID = await ifcModel.modelID;    
    const spatialStructure = await ifcModel.ifcManager.getSpatialStructure(modelID, true)
    setTree(spatialStructure)
  }

export function getAllIds(ifcModel, setAllIDs) {
  const allIDs = Array.from(
		new Set(ifcModel.geometry.attributes.expressID.array),
	);
  setAllIDs(allIDs) 
  return allIDs 
}

export function getWholeSubset(viewer, ifcModel, allIDs) {
	return viewer.IFC.loader.ifcManager.createSubset({
		modelID: ifcModel.modelID,
		ids: allIDs,
		applyBVH: true,
		scene: ifcModel.parent,
		removePrevious: true,
		customID: 'full-model-subset',
	});
}

export function replaceOriginalModelBySubset(viewer, ifcModel, subset) {
	const items = viewer.context.items;

	items.pickableIfcModels = items.pickableIfcModels.filter(model => model !== ifcModel);
	items.ifcModels = items.ifcModels.filter(model => model !== ifcModel);
	ifcModel.removeFromParent();

	items.ifcModels.push(subset);
	items.pickableIfcModels.push(subset);
}

export function setupEvents(viewer, container, allIDs, setSelectedID) {
    window.onmousemove = async () => await viewer.IFC.selector.prePickIfcItem();
    //  window.oncontextmenu = () =>showAllItems(viewer, allIDs);
      window.onkeydown = (event) => {
             // if (event.code === 'KeyE') { //???
            //   dimensionsActive = !dimensionsActive;
            //   viewerRef.current.dimensions.active = dimensionsActive;
            //   viewerRef.current.dimensions.previewActive = dimensionsActive;
            //   // viewerRef.current.IFC.unPrepickIfcItems();
            //   // window.onmousemove = dimensionsActive ? null :  viewerRef.current.IFC.prePickIfcItem;
            // }     
          if (event.code === 'Delete') {
           viewer.removeClippingPlane();
           viewer.dimensions.delete()
          }
          if (event.code === 'Escape') {
            // showAllItems(viewer, allIDs);
           viewer.context.ifcCamera.cameraControls.mouseButtons.left = cameraControls.ACTION.ROTATE;
             container.style.cursor = 'auto';
           viewer.IFC.unpickIfcItems();
           viewer.removeClippingPlane();
           setSelectedID('')
            // viewerRef.current.IFC.pickIfcItem(false)
      
          }
      };
  }

//   function hideClickedItem(viewer) {
// 	const result = viewer.context.castRayIfc();
// 	if (!result) return;
// 	const manager = viewer.IFC.loader.ifcManager;
// 	const id = manager.getExpressId(result.object.geometry, result.faceIndex);
// 	viewer.IFC.loader.ifcManager.removeFromSubset(
// 		0,
// 		[id],
// 		'full-model-subset',
// 	);
// }

export function showAllItems(viewer, ids) {
	viewer.IFC.loader.ifcManager.createSubset({
		modelID: 0,
		ids,
		removePrevious: false,
		applyBVH: true,
		customID: 'full-model-subset',
	});
}


//CONTROLES 
export async function handleSelect (viewer, setSelectedID, setTypeProps, setCategorySelected)  {
    if (viewer.clipper.active) {
      viewer.clipper.createPlane();
    } else {
      const result = await viewer.IFC.selector.pickIfcItem(true)
      if (!result) return;
      const {
        modelID,
        id
      } = result;
      const props = await viewer.IFC.getProperties(modelID, id, true, false);
      const typeProps = await viewer.IFC.loader.ifcManager.getTypeProperties(modelID, parseInt(id), true); 
      const itemProps = await viewer.IFC.loader.ifcManager.getPropertySets(modelID, parseInt(id), true);
      const ifcType = await viewer.IFC.loader.ifcManager.getIfcType(modelID, parseInt(id), true);  
      setCategorySelected(ifcType)
      setSelectedID(parseInt(id))
      setTypeProps(typeProps)
    }
  }

export function  handleMove (viewer, container ) {
  viewer.context.ifcCamera.cameraControls.mouseButtons.left = cameraControls.ACTION.TRUCK;
  container.style.cursor = 'move';
}

export function handleRotate(viewer, container ) {
  viewer.context.ifcCamera.cameraControls.mouseButtons.left = cameraControls.ACTION.ROTATE;
  container.style.cursor = 'grab';
}

export function handleZoom(viewer, container ) {
  viewer.context.ifcCamera.cameraControls.mouseButtons.left = cameraControls.ACTION.DOLLY;
 container.style.cursor = 'zoom-in';
}

export function handleOrto (viewer ) {
  viewer.context.getIfcCamera().toggleProjection();
}

export function handleClipping (viewer ) {
  viewer.toggleClippingPlanes();
}

let grid;
export function handleGrid (viewer ) {
  if (!grid) {
    grid = new GridHelper(50, 30);

    viewer.context.scene.add(grid);
  } else if (grid) {
    viewer.context.scene.remove(grid);
    grid = undefined;

  }

}

export function handleFullscreen ( container ) {
  if (!document.fullscreenElement) {
   container.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

