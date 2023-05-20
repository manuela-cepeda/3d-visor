
import { ViewerContext } from "context/ViewerContext";
import React, {  Suspense, useContext } from "react"

const TreeView = React.lazy(() => import("./TreeView"));
const TreeElements = React.lazy(() => import("./TreeElements"));


const LeftPanel = ( ) => {

  const [openTabL, setOpenTabL] = React.useState(1); 
  const { selectFromList, tree }= useContext(ViewerContext);  

  return (
    <div
    onDoubleClick={(e) => selectFromList(e)}
    className=" relative bg-white  shadow-lg  overflow-y-auto"    >
  
    <div className=" cursor-pointer sticky top-0 bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        <li className="mr-2">
        <a
        onClick={() => setOpenTabL(1)}
        className={"inline-block p-4 rounded-t-lg border-b-2 active " + 
        (openTabL === 1
            ? "text-orange-500 hover:text-orange-600  border-orange-500"
            : "text-blueGray-700 hover:text-blueGray-500 hover:border-gray-300 "
        ) }
        aria-current="page">Elements </a>
        <a onClick={() => setOpenTabL(2)}
        className={"inline-block p-4 rounded-t-lg border-b-2 active " + (openTabL === 2
            ? "text-orange-500 hover:text-orange-600  border-orange-500"
            : "text-blueGray-700 hover:text-blueGray-500 hover:border-gray-300 ")
        }>Levels </a>
            <a onClick={() => setOpenTabL(3)}
        className={"inline-block p-4 rounded-t-lg border-b-2 active " + (openTabL === 3
            ? "text-orange-500 hover:text-orange-600  border-orange-500"
            : "text-blueGray-700 hover:text-blueGray-500 hover:border-gray-300 ")
        }>Phases </a>
        </li>
      </ul>
    </div>
    <div className="mt-3">

    
    {openTabL === 1 && (
                 
         <Suspense fallback={<div>Loading</div>}>
         <TreeElements data={[tree]}    /> 
      </Suspense>
    )}  
     {openTabL === 2 && (
          <Suspense fallback={<div>Loading</div>}>
            <TreeView data={[tree]}  /> 
          </Suspense>
     )}
       {openTabL === 3 && (
         <p>-</p>
     )}
    </div>
    
    
  </div>
  )
}

export default LeftPanel;