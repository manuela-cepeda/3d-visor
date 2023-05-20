
import ViewerElementDropdown from './ViewerElementDropdown';
import { ViewerContext } from 'context/ViewerContext';
import React, { memo, useContext, useRef, useState } from 'react'

const ElementNode = ({ node, categoryName}) => {	

	const { hide, selectedID }=useContext(ViewerContext);
	const [isShown, setIsShown] = useState(false);

	//si se selecciona 1 elemento en el modelo se muestra en la lista de elementos
	const isSelected =  node.expressID === selectedID ?  true : false; 
	const nodeRef =  useRef()  	
	if(isSelected === 1  && nodeRef.current){  
    nodeRef.current.scrollIntoView({ block: "center", behavior: 'smooth' })	

   }

	const handleHide = (e) => { 
			if(e.target.classList.contains('fas')){              
				hide(parseInt(e.target.parentNode.parentNode.id), 'hide') ;        
				e.target.classList.remove('fas')
				e.target.classList.add('far')
			}else if(e.target.classList.contains('far')){         
				hide(parseInt(e.target.parentNode.parentNode.id), 'show') ; 
				e.target.classList.remove('far')
				e.target.classList.add('fas')
			}
	}




  return (
    <li 
	key={node.expressID}
	onMouseEnter={() => setIsShown(true)}
	onMouseLeave={() => setIsShown(false)}
	 ref={nodeRef}  id={node.expressID} className={`flex justify-between mb-1  ${ isSelected  ? "bg-orange-100" : ""  }`}>            
        {node.name}		
    <div className='flex items-center'>	
		{isShown && <ViewerElementDropdown  elementID={node.expressID} />	}			 
    	<i  onClick={handleHide}  className ={` hover:text-orange-500   fas fa-lightbulb pr-2 `} ></i> {/* ${lightbulbOn} */}
    </div>

  </li>
  )
}

export default memo(ElementNode)