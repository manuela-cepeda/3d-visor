

 const  ListProperties =  ({typeProps, category}) => {


const filterByCategory = typeProps.filter(item => item.category === category)

  /* ↓↓ FUNCIONES AUXILIARES ↓↓ */
//  Decoding special symbols
const decodeSymbols = (ifcString) => {

  const ifcUnicodeRegEx = /\\X4\\(.*?)\\X0\\/uig;
  let resultString = ifcString;
  let match = ifcUnicodeRegEx.exec(ifcString);

  while (match) {
    let matchArr = match[1].split("000");
    let unicodeCharArr = matchArr.map((i) => {
      let a = '0x';
      a = a.concat(i);
      if (a !== "0x") {
        let unicodeChar = String.fromCodePoint(a);
        return unicodeChar;
      }
    });
    const unicodeChar = unicodeCharArr.join("");
    resultString = resultString.replace(match[0], unicodeChar);
    match = ifcUnicodeRegEx.exec(ifcString);
  }
  return resultString;
}

// Decode textos
const decodeText = (ifcString) => {
  const ifcUnicodeRegEx = /\\X2\\(.*?)\\X0\\/uig;
  let resultString = ifcString;
  let match = ifcUnicodeRegEx.exec(ifcString);

  while (match) {
    const unicodeChar = String.fromCharCode(parseInt(match[1], 16));
    resultString = resultString.replace(match[0], unicodeChar);
    match = ifcUnicodeRegEx.exec(ifcString);
  }
  return resultString;
}

/// Filtro de propiedades
const filtroProps = (property) => {
  const hideProps = ['GlobalId', 'OwnerHistory', 'expressID', 'Description', 'Name', 'type'];
  const found = hideProps.find(i => i === property);
  if (!found) {
    return true;
  }
}


const listByElement = filterByCategory.map(element => {
  const  elementName = element?.Name?.value;
  const details = element?.HasPropertySets?.map((pset) => {   
    // const set = pset.Name?.value ? decodeText(decodeSymbols(pset.Name?.value)) : pset.constructor.name;
    let props;
    if (pset.HasProperties) {
      props = pset.HasProperties?.map((prop) => {
        const name = decodeText(decodeSymbols(prop.Name?.value));
        const value = decodeText(decodeSymbols(prop.NominalValue?.value));
        /* const label = decodeText(decodeSymbols(prop.NominalValue?.label)); */
        return {          
          name,
          value: [value]/* ,
          label */
        };
      });
      // para fabricante technal (excepcion)
    } else if (pset.Name === null) {
      props = Object.entries(pset).map(([key, val]) => {
        const name = decodeText(decodeSymbols(key));
        const value = val?.value ? decodeText(decodeSymbols(val?.value)) : val;
        return {
          name,
          value: [value]
        };
      });  
    }
    return {   
      props
    };  
  });
  return {elementName, details}  
});


  let listByProperty = []
  listByElement.forEach((item,i) => {
    let fila = i+1
    //primero guardo nombre de cada elemento (1 columna)
    const repeated = listByProperty.find(i => i.name === 'Element')
    if(repeated){
      repeated.value.push({key: fila, val:  item.elementName})
    }else if(item.elementName !== undefined) {
      listByProperty.push({name: 'Element', value:[{key: fila, val: item.elementName}]})  
    }
    
    //guardo propiedades y valores (2da columna en adelante)
    item.details?.forEach( item =>{
       item?.props?.forEach(item =>  {        
        const repeated = listByProperty.find(i => i.name === item.name)      
        if(repeated){
           const [newValue] =item.value
          repeated.value.push({key: fila, val: newValue})
        }else{
          const [newValue] =item.value      
          let value =  [
            {key: fila, val: newValue}
          ]  
          for(let i=1; i< fila; i++){
            value.push({key: i, val: '-'})
          }         
          listByProperty.push({name: item.name, value: value})          
        }
        
      })
    })    
    //chequeo que no haya vacios en el array que cree
    listByProperty?.forEach(item => {
      const hasKey = item.value.some(i => i.key === fila)
      !hasKey && item.value.push({key: fila , val: '-'})
    
    })
  })
 

  return (
    <>
    
    {listByProperty.length>1 && 
 
     <table id="props-table" className="table-fixed ">
      <thead className="sticky z-0  top-0 bg-gray-50 ">
      <tr>     
      {listByProperty.map(item => {              
            return (                
              <th   className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                {item.name}
              </th>           
            )            
          })
        }
        </tr>
      </thead>
        
      <tbody>
      
       {listByElement.map( (item, i) => { 
         const index = i+1; 
        return(        
        <tr >
          {listByProperty.map(item =>{          
            const filter = item.value.filter(i => i.key === index)    
           
            return (
              <>     
             {filter.map( prop =>{              
               let propValue = prop.val === 'T' ? 'True' :
                                prop.val === 'F' ? 'False' :
                                typeof prop.val === 'number' && prop.val % 1 != 0  ? prop.val.toFixed(2) :
                                typeof prop.val === 'number' && prop.val === 0  ? 0 :
                                prop.val === null || prop.val === ""  ? '-' :
                                prop.val;                
                return (                  
                  <td className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {propValue}
                  </td>                  
                )
            })}
            </>
            )
          })
          }
      </tr>)      
       })
      }
      </tbody>
      </table>  
      } 
   
    </ >
  );
}


export default ListProperties;
