
import { ViewerContext } from "context/ViewerContext";
import { useContext } from "react";


const ViewerContextMenu = (  ) => {

  const {addToTable, isolate, selectedID, viewer , hide, ShowAllMenu, CommentOnElement, unselectAll}=useContext(ViewerContext); 


  return (
    <>   
    <ul>
      {/* {selectedID  &&  */}
       <>
      <li
          className={ 
            "hover:bg-gray-200 px-4  text-xs py-2 font-normal block cursor-pointer w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={()=>{hide(selectedID, 'hide')}}
        >
         Hide selected
      </li>
      <li
          className={
            "hover:bg-gray-200 px-4  text-xs py-2 font-normal block cursor-pointer w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={()=>{isolate(selectedID)}}
        >
         Isolate selected
      </li>
      <li
          className={
            "hover:bg-gray-200 px-4  text-xs py-2 font-normal block cursor-pointer w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={()=>{viewer.IFC.unpickIfcItems();}}
        >
         Unselect element
      </li>
      <li
          className={
            "hover:bg-gray-200 px-4  text-xs py-2 font-normal block cursor-pointer w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => {CommentOnElement()}}
        >
         Add Comment 
      </li>
      <li
          className={
            "hover:bg-gray-200 px-4  text-xs py-2 font-normal block cursor-pointer w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          // onClick={handleShowAll}
        >
         Add to Phases
      </li>
      <li
          className={
            "hover:bg-gray-200 px-4  text-xs py-2 font-normal block cursor-pointer w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
           onClick={ () => addToTable()}
        >
         Add to List
      </li>
      </>
      {/* } */}
       <div className="h-0  border border-solid border-blueGray-100" /> 
        <>
           <li
          className={
            "hover:bg-gray-200 px-4 text-xs py-2 font-normal block cursor-pointer w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => { ShowAllMenu() }}
        >
         Show All Items
      </li>
      <li
          className={
            "hover:bg-gray-200 px-4  text-xs py-2 font-normal block cursor-pointer w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => {unselectAll(); }}
        >
         Unselect all
      </li>
        </>
      
    
      
    </ul>
    </>
    
  )
}

export default ViewerContextMenu