import { useState } from 'react';
import Comments from './Comments'
import ItemProperties from './ItemProperties'

const RigthPanel = ({ nameSelected }) => {
  
  const [openTabR, setOpenTabR] = useState(1);   

  return (
    <>
     <div className="relative bg-white  shadow-lg  overflow-y-auto">
            <div className=" cursor-pointer sticky top-0 bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                <li className="mr-2">
                  <a
                    onClick={() => setOpenTabR(1)}
                    className={"inline-block p-4 rounded-t-lg border-b-2 active " + (openTabR === 1
                      ? "text-orange-500 hover:text-orange-600  border-orange-500"
                      : "text-blueGray-700 hover:text-blueGray-500 hover:border-gray-300 ")
                    }
                    aria-current="page">Properties </a>
                </li>
                <li className="mr-2">
                  <a onClick={() => setOpenTabR(2)}
                    className={"inline-block p-4 rounded-t-lg border-b-2 active " + (openTabR === 2
                      ? "text-orange-500 hover:text-orange-600  border-orange-500"
                      : "text-blueGray-700 hover:text-blueGray-500 hover:border-gray-300 ")
                    }>Comments</a>
                </li>


              </ul>
            </div>
            {openTabR === 1 && (<ItemProperties />)}
            {openTabR === 2 && (<Comments nameSelected={nameSelected}  />)}
     </div>
    </>
  )
}

export default RigthPanel
