
import ViewerElementDropdown from './ViewerElementDropdown';
import ViewerLevelDropdown from './ViewerLevelDropdown';
import { ViewerContext } from 'context/ViewerContext';
import React, { memo, useContext, useRef, useState } from 'react'
import TreeView from './TreeView';


 const TreeViewNode =   ({ node }) => { 
    
    const {selectedID , hide}= useContext(ViewerContext); 
      
    const [childVisible, setChildVisiblity] = useState(true); 
    const [hideElement, setHideElement] = useState('fas fa-lightbulb');   
    const [isShown, setIsShown] = useState(false);

    const isSelected =  node.expressID == selectedID ?  true : false; 

    const nodeRef =  useRef()  
    let hasChild
    if(node.children != undefined) {
     hasChild = node.children.length ? true : false;
      
    }  
   if(isSelected == 1  && nodeRef.current){
  
    nodeRef.current.scrollIntoView({ block: "center", behavior: 'smooth' })
   }
    
   const handleHide = () => {
     if(hideElement.indexOf('fas')  !== -1){
      hide(node.expressID, 'hide') ;
      setHideElement("far fa-lightbulb")
     }
     if(hideElement.indexOf('far')  !== -1){
      hide(node.expressID, 'show') ;
      setHideElement("fas fa-lightbulb")
     }
  }  

  const childsID = hasChild && node.children.map(children => children.expressID)
 

  /// Filtro de propiedades
const filtroTree = (property) => {
  const hideTree = ['IFCSITE',  'IFCBUILDING','IFCPROJECT'];
  const found = hideTree.find(i => i === property);
  if (!found) {
    return true;
  }
}
   
    return (
      <>
      <li  
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
       ref={nodeRef} className={`cursor-pointer  ${ isSelected  ? "bg-orange-100" : ""  }`}>
       
        { filtroTree(node.type) &&  ( <div className="p-1 text-xs" >
          <div  id={node.expressID} className={`flex justify-between  select-none ${ hasChild ? "font-semibold" : ""  } `}  >      
           <div onClick={() => setChildVisiblity((v) => !v)} > 
              {hasChild && (
                <>
                  <i className={`pr-1 fas  ${childVisible ? "fa-angle-down" : "fa-angle-right"}`}  ></i>
                  <i className={`pr-1 fas  ${childVisible ? "fa-folder-open" : "fa-folder"}`}> </i>
                </>
              ) }               
             {  node.ObjectType?.value || node.Name?.value || node.type } {hasChild && <>({childsID.length}) </>  }
             </div>              
             <div className='flex'>
              {hasChild &&
               <>{isShown && <ViewerLevelDropdown childsID={childsID} />} </> }   

              { hasChild == false &&   (
                <>
               {isShown && <ViewerElementDropdown elementID={node.expressID} /> }
                <i 
                onClick={handleHide}               
               className ={` hover:text-orange-500  ${hideElement} pr-2 `} ></i>
                </>
              )}
            </div> 
                
          
            
           </div>   
       
        </div>
        )}
              
        {hasChild && childVisible && (
          <div className="d-tree-content">
            <ul className="d-flex d-tree-container flex-column pl-1 ">
              <TreeView data={node.children}  />
            </ul>
          </div>
        )}
      </li>
      </>
    );
  };


export default memo(TreeViewNode);