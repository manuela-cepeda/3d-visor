import CategoryNode from './CategoryNode';

 const CardTreeElements = ({data = []}) => {  

  let types = [] 
  
  
  data?.forEach((tree) =>{getCategories(tree.children, types)})    
  function getCategories(child, types){        
    child?.forEach(child => {     
      const existe = types.find(item => item.type == child.type);
      if (!existe) { 
        types.push({type: child.type, cant: 1, element: [{expressID: child.expressID, name: child.ObjectType?.value}]})
      } else {
        const i = types.findIndex(item => item.type == child.type);
        types[i].cant++;
        types[i].element.push({expressID: child.expressID, name: child.ObjectType?.value});
      }
    });
    child?.forEach(child => getCategories(child?.children, types ));         
  }
 

  /// Filtro de propiedades
  const filtroTree = (property) => {
    const hideTree = ['IFCSITE',  'IFCBUILDING','IFCPROJECT', 'IFCBUILDINGSTOREY', 'IFCSTAIR', 'IFCCURTAINWALL']; //VERRR
    const found = hideTree.find(i => i === property);
    if (!found) {
      return true;
    }
  }


  return (
    <>           
      <div className="m-1">
        <ul className="p-1 text-xs text-blueGray-700 select-none cursor-pointer  ">
          { types?.map((item, i) => 
            filtroTree(item.type) &&  (
              <li  key={i} id={item.type} >              
                <CategoryNode   node={item}  />
              </li>
            ) 
          )}
        </ul>
    </div>     
        
    </>
  )
}


export default CardTreeElements;



  