import { ViewerContext } from "context/ViewerContext";
import { useContext } from "react";


 const  ItemProperties =  () => {

  const { typeProps }=useContext(ViewerContext); 


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

const details = typeProps[0]?.HasPropertySets?.map((pset) => {
  const set = pset.Name?.value ? decodeText(decodeSymbols(pset.Name?.value)) : pset.constructor.name;
  let props;
  if (pset.HasProperties) {
    props = pset.HasProperties?.map((prop) => {
      const name = decodeText(decodeSymbols(prop.Name?.value));
      const value = decodeText(decodeSymbols(prop.NominalValue?.value));
      /* const label = decodeText(decodeSymbols(prop.NominalValue?.label)); */
      return {
        name,
        value/* ,
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
        value
      };

    });

  }
  return {
    set,
    props
  };

});

// console.log(details)


  return (
    <>
      <div className=" flex flex-col min-w-0 break-words w-full ">
     

          {/* Projects table */}
          <table className=" w-full bg-transparent border-collapse table-fixed	">
           
            <tbody>
              {details ? 
              details.map((set,i) => {
                if(set.props){
                  let setProps = set.props; 
                  return (
                      <>
                      <tr > 
                      <th key={i} id={set.set}  colSpan={2}  className="bg-blueGray-50 border-t-0  border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {set.set}
                        {/* <div className='show-hide' ><i className='fas fa-minus'></i></div> */}
                      </th>
                       </tr>
                     {  setProps.map((prop, i)=>{ 
                        if(filtroProps(prop.name) ) {
                          let propName = prop.name;
                          let propValue = prop.value === 'T' ? 'True' : 
                                          prop.value === 'F' ? 'False' :    
                                          typeof prop.value === 'number' && prop.value % 1 != 0  ? prop.value.toFixed(2) :
                                          typeof prop.value === 'number' && prop.value === 0  ? 0 :
                                          prop.value === null || prop.value === ""  ? '-' :
                                          prop.value;
                          return (
                            <tr>
                            <th  className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                              {propName}
                                {/* <div className='show-hide' ><i className='fas fa-minus'></i></div>
                              */}                           
                               </th>
                            <td  className="border-t-0  align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                             {propValue}
                            </td>
                            </tr>

                          ) 

                        }

                        })
                    } 

                    </>
                    )
                  }
              })
               : 
              ( 
                <tr>
                <td className="p-4 text-sm">Select an element that has properties</td>
                </tr>
              )
               
              }
             
            </tbody>
          </table>
       
      </div>
    </>
  );
}


export default ItemProperties;
