

import ViewerCategoryDropdown from './ViewerCategoryDropdown';
import { ViewerContext } from 'context/ViewerContext';
import React, { useContext, useEffect, useState } from 'react'
import ElementNode from './ElementNode';


 const CategoryNode =   ({ node }) => {

  const {selectedID , hideCategory}= useContext(ViewerContext);   
   const encontrado = node.element.some(item => item.expressID == selectedID  )
   const [isShown, setIsShown] = useState(false);
   const [childVisible, setChildVisiblity] = useState(false);

   useEffect(() => {
    if (encontrado) {
      setChildVisiblity(true)      
    } else {
      setChildVisiblity(false)
      }
   }, [selectedID]);
    
   const handleHide = (e) => {  
     if(e.target.classList.contains('fas')){
        hideCategory(node.type, 'hide')
        e.target.classList.remove('fas')
        e.target.classList.add('far')
     }else if(e.target.classList.contains('far')){     
       hideCategory(node.type, 'show')  
       e.target.classList.remove('far')
       e.target.classList.add('fas')
     }
    }


    return (
      <>      
        <div 
          className='flex justify-between mb-2' 
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <div onClick={() => setChildVisiblity((v) => !v)}>  
            <i  className={`pr-1 fas  ${childVisible ? "fa-angle-down" : "fa-angle-right"}` }  ></i>
            <i className={`pr-1 fas  ${childVisible ? "fa-folder-open" : "fa-folder"}`}> </i>
            <span className="font-semibold">{node.type} </span>   ({node.cant})
          </div> 
         
            <div>              
              {isShown &&  <ViewerCategoryDropdown categoryType={node.type} />}            
              <i  className="fas fa-lightbulb pr-2 hover:text-orange-500 " onClick={handleHide} ></i>
            
            </div>
            {/* )}    */}
        </div>
        <ul className='pl-2 '>         
        {node.element.map( (item, i) =>         
        childVisible && (                      
          <ElementNode  categoryName={node.type} key={i} node={item}  />              
        )                 
        )}
        </ul>
      </>
    );
  };


export default CategoryNode;