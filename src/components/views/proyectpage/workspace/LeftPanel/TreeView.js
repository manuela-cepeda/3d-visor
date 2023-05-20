
import  TreeViewNode  from './TreeViewNode'

 const TreeView = ({data = [] }) => {  
    
  return (
      <>    
        
         <div className="mb-1">
            <ul className="text-sm text-blueGray-700">
            { data?.map((tree) =>
            (                 
                 <TreeViewNode key={tree.expressID} node={tree}/> 
            )
            )}
            </ul>
        </div>
      
         
      </>
  )
}


export default TreeView;



  