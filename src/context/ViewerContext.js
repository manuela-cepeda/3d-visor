import { showAllItems } from 'utils/IFCJSfunctions';

import {createContext, useState} from 'react'
import {
  IFCSTAIR,
  IFCSTAIRFLIGHT, 
  IFCBUILDINGELEMENTPROXY,
  IFCWALL,
  IFCCOVERING, 
  IFCFLOWTERMINAL,
  IFCCURTAINWALL, 
  IFCROOF,
  IFCRAILING,
  IFCWALLSTANDARDCASE,
  IFCSLAB,
  IFCDOOR,
  IFCWINDOW,
  IFCFURNISHINGELEMENT,
  IFCMEMBER,
  IFCPLATE,
  IFCCOLUMN 
} from 'web-ifc'; 

export const ViewerContext =createContext();

const ViewerContextProvider = ({children}) => { 

  const [viewer, setViewer] = useState() //API
  const [modelID, setModelID] = useState('')  //id
  const [allIDs, setAllIDs] = useState([])   
  const [tree, setTree] = useState('');
  const [selectedID, setSelectedID] = useState() //expressID
  const [categorySelected, setCategorySelected] = useState('')
  const [typeProps, setTypeProps] = useState([]);
  const [categoryList, setCategoryList] = useState([])
  const [table, setTable] = useState([]) 
  const [showComment, setShowComment] = useState(false)
  const [comments, setComments] = useState([])
  const [nameSelected, setnameSelected] = useState('')

  //SELECT FROM LIST IN LEFT PANEL 
  const selectFromList = async (e) => {
    let ids = []
    let expressID;
    expressID = e.target.id ? parseInt(e.target.id):
                e.target.parentNode.id ? parseInt(e.target.parentNode.id) :
                e.target.parentNode.parentNode.id? parseInt(e.target.parentNode.parentNode.id) :
                parseInt(e.target.parentNode.parentNode.parentNode.id)
    ids.push(expressID)
    viewer.IFC.pickIfcItemsByID(modelID, ids);    
    setSelectedID(expressID)
    const typeProps = await viewer.IFC.loader.ifcManager.getTypeProperties(modelID, expressID, true);
    const ifcType = await viewer.IFC.loader.ifcManager.getIfcType(modelID, expressID, true);   
    setTypeProps(typeProps)
    setCategorySelected(ifcType)

  }

  //VISIBILIDAD ELEMENTO UNICO (SE LLAMAN DESDE CONTEXT MENU O DESDE LISTA DE ELEMENTOS)
  let idsIsolate = []
  const isolate = async (expressID) => {     
    if (idsIsolate.length === 0) {
      idsIsolate.push(expressID);
      viewer.IFC.loader.ifcManager.createSubset({
        modelID: 0,
        ids: idsIsolate,
        removePrevious: true,
        applyBVH: true,
        customID: 'full-model-subset',
      });
    } else {
      viewer.IFC.loader.ifcManager.createSubset({
        modelID: 0,
        ids: allIDs,
        removePrevious: true,
        applyBVH: true,
        customID: 'full-model-subset',
      });
      idsIsolate = []
    }
    viewer.IFC.unpickIfcItems();
  }  
  let idsHide = []  
  const hide = async (expressID, action) => {   
    if (action.indexOf('hide') !== -1) {
      idsHide.push(expressID);     
     viewer.IFC.loader.ifcManager.removeFromSubset(
        modelID,
        idsHide,
        'full-model-subset',
      );
    } else if (action.indexOf('show') !== -1) {
      const i = idsHide.indexOf(expressID);
      let idShow = []
      idShow.push(idsHide[i])
      showAllItems(viewer, idShow)
      if (i !== -1) { idsHide.splice(i, 1) }
    }
   viewer.IFC.unpickIfcItems();
  }

  //VISIBILIDAD X CATEGORIA (SE LLAMAN DESDE LISTA DE CATEGORIAS)
  let idsCategory = []
  const categories = {
    IFCBUILDINGELEMENTPROXY,
    IFCCOVERING, 
    IFCFLOWTERMINAL,
    IFCCURTAINWALL,
    IFCRAILING, 
    IFCSTAIR,
    IFCSTAIRFLIGHT,
    IFCWALL,
    IFCWALLSTANDARDCASE,
    IFCROOF,
    IFCSLAB,
    IFCFURNISHINGELEMENT,
    IFCDOOR,
    IFCWINDOW,
    IFCPLATE,
    IFCMEMBER,
    IFCCOLUMN 
   };
  const isolateCategory = async (category) => {  
    const ids = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, categories[category], false);
    if (idsCategory.length === 0 ) {     
      idsCategory.push(ids)
     viewer.IFC.loader.ifcManager.createSubset({
        modelID,
        ids,
        removePrevious: true,
        applyBVH: true,
        customID: 'full-model-subset',
      });
    } else {
      idsCategory = [];
     viewer.IFC.loader.ifcManager.createSubset({
        modelID,
        ids: allIDs,
        removePrevious: true,
        applyBVH: true,
        customID: 'full-model-subset',
      });    
    }
  }  
  let idsHideCategory = []  
  const hideCategory = async (category, action) => {
    // const modelID = modelIDRef.current;
    const ids = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, categories[category], false);
  
    if (action.indexOf('hide') !== -1) {
      idsHideCategory.push(...ids);  
      viewer.IFC.loader.ifcManager.removeFromSubset(
        modelID,
        idsHideCategory,
        'full-model-subset',
      );
    } else if (action.indexOf('show') !== -1) {
      ids.forEach(id => {
        
        const i = idsHideCategory.indexOf(id);
        let idShow = []
        idShow.push(idsHideCategory[i])
        showAllItems(viewer, idShow)
        if (i !== -1) { idsHideCategory.splice(i, 1) }
      });
    }

  }
  const selectAllByCategory = async (category) => {
    const ids = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, categories[category], false);
    viewer.IFC.pickIfcItemsByID(modelID, ids)
  }


  //visibilidad por childs id
  const selectAllChilds = (childsID) => { 

  viewer.IFC.pickIfcItemsByID(modelID, childsID)
  }

  let idsIsolateChilds = []
  const isolateChilds = (childsID) => { 
    
    if (idsIsolateChilds.length === 0 ) {     
      idsIsolateChilds.push(childsID)
      console.log(idsIsolateChilds)
     viewer.IFC.loader.ifcManager.createSubset({
        modelID,
        ids: childsID,
        removePrevious: true,
        applyBVH: true,
        customID: 'full-model-subset',
      });
    } else {
      idsIsolateChilds = [];
     viewer.IFC.loader.ifcManager.createSubset({
        modelID,
        ids: allIDs,
        removePrevious: true,
        applyBVH: true,
        customID: 'full-model-subset',
      });    
    }
  }

  const unselectAll = () => { 
  viewer.IFC.unpickIfcItems();
  }


  //MOSTRAR TODO  (CONTEXT MENU )
  const ShowAllMenu = () => { 
    viewer.IFC.loader.ifcManager.createSubset({
      modelID,
      ids: allIDs,
      removePrevious: true,
      applyBVH: true,
      customID: 'full-model-subset',
    }); 
    const lightbulbs = document.getElementsByClassName('far fa-lightbulb ') 
    Array.from(lightbulbs).forEach(lightbulb => {
      lightbulb.classList.remove('far')
      lightbulb.classList.add('fas')
    });
  }

  //AGREGAR COMENTARIO (CONTEXT MENU )
  const CommentOnElement = async() => { 
    const props = await viewer.IFC.getProperties(modelID, selectedID, true, false);
    setnameSelected(props?.Name.value)  
    setShowComment(true) 
   }

   const addNewComment = (newComment) => { 
      setComments([...comments, newComment])
    }  

  const deleteComment = (index) => { 
     setComments( [...comments.slice(0, index), ...comments.slice(index + 1)] )     
   }

   const addNewResponse = (i, response) => { 
      // const comment = comments[i].respuestas
      const responses = comments[i].answers ? comments[i].answers : []
      responses.push(response)
      const commentWithResponse ={...comments[i], answers : responses }      
      setComments( [...comments.slice(0, i), commentWithResponse, ...comments.slice(i + 1)] )    
    }
    
    
  //ACCIONES SOBRE TABLE (BOTTOM PANEL)  
  let tablemap= []
  const addToTable = async ( props ) => { 
    props = (typeof props !== 'undefined') ? props : typeProps 
   
    if(categorySelected !== ''){ 
      categoryList.indexOf(categorySelected) === -1 && setCategoryList([...categoryList, categorySelected]) 
    } 
    tablemap.push({...props[0], category: categorySelected })
    handleChange()
  }

  const handleChange = () => {
    setTable([...table,  ...tablemap ]) 
  }

  const addCategoryToTable = async (category) => { 
    const ids = await viewer.IFC.loader.ifcManager.getAllItemsOfType(modelID, categories[category], false);    
    if(categorySelected !== ''){            
      categoryList.indexOf(categorySelected) === -1 && setCategoryList([...categoryList, categorySelected])   
       ids.forEach(async (id) => {
        const typeProps = await viewer.IFC.loader.ifcManager.getTypeProperties(modelID, id, true);     
        addToTable( typeProps)    
       })   
    }    
  }  

  const deleteFromTable= (category) => { 
    
    const tableFilter = table.filter(item => item.category !== category)
    setTable(tableFilter)
    const categoryFilter = categoryList.filter(item => item !== category)
    setCategoryList(categoryFilter)

   }  
 

  return (
    <ViewerContext.Provider value={{ modelID, setModelID, allIDs, setAllIDs, viewer, setViewer, tree, setTree, typeProps, setTypeProps, selectedID, setSelectedID, setCategorySelected, selectFromList, isolate, hide, isolateCategory, hideCategory, selectAllByCategory, unselectAll, selectAllChilds, isolateChilds, ShowAllMenu, nameSelected, showComment, setShowComment, comments, addNewComment, CommentOnElement, deleteComment, addNewResponse, categorySelected,  categoryList, table, addToTable, addCategoryToTable, deleteFromTable }}>

    {children}
    </ViewerContext.Provider>
  )
}

export default ViewerContextProvider;