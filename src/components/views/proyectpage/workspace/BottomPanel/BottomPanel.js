import ViewerDownloadDropdown from "./ViewerDownloadDropdown";
import { ViewerContext } from "context/ViewerContext";
import { useContext, useEffect, useRef, useState } from "react";
import { TableExport  } from "tableexport";
import ListProperties from "./ListProperties";

const BottomPanel = () => {

  const {table, categoryList, deleteFromTable}=useContext(ViewerContext); 
  const [openTab, setOpenTab] = useState(categoryList ? categoryList[0] : '')  
  const tableRef = useRef()
  const exportDataXLSXRef = useRef()
  const exportDataTXTRef = useRef()
  const exportDataCSVRef = useRef()

  useEffect(() => {
    const propTable = document.getElementById("props-table"); 
    
    if(propTable !== null) {
    var tableId = 'props-table';
    const tableExport = TableExport(propTable , {
      headers: true,                              // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
      footers: true,                              // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
      formats: ['txt','xlsx', 'csv'],           // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
      filename: openTab,                             // (id, String), filename for the downloaded file, (default: 'id')
      bootstrap: false,                           // (Boolean), style buttons using bootstrap, (default: true)
      exportButtons: false,                        // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
      position: 'top',                         // (top, bottom), position of the caption element relative to table, (default: 'bottom')
      ignoreRows: null,                           // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
      ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
      trimWhitespace: true,                       // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
      RTL: false,                                 // (Boolean), set direction of the worksheet to right-to-left (default: false)
      sheetname: "id"                             // (id, String), sheet name for the exported spreadsheet, (default: 'id')
  })
   
    
    var XLSX = tableExport.CONSTANTS.FORMAT.XLSX;
    var TXT = tableExport.CONSTANTS.FORMAT.TXT;
    var CSV = tableExport.CONSTANTS.FORMAT.CSV;
    var exportDataXLSX = tableExport.getExportData()[tableId][XLSX];
    var exportDataTXT = tableExport.getExportData()[tableId][TXT];    
    var exportDataCSV = tableExport.getExportData()[tableId][CSV];    
    
    tableRef.current = tableExport;
    exportDataXLSXRef.current = exportDataXLSX
    exportDataTXTRef.current = exportDataTXT
    exportDataCSVRef.current = exportDataCSV
  
    }
  }, [openTab, table])

 
  const handleDownloadXLSX = () => {    
    tableRef.current && tableRef.current.export2file(exportDataXLSXRef.current.data, exportDataXLSXRef.current.mimeType, exportDataXLSXRef.current.filename, exportDataXLSXRef.current.fileExtension);
   }
   const handleDownloadCSV = () => { 
     tableRef.current &&  tableRef.current.export2file( exportDataCSVRef.current.data,  exportDataCSVRef.current.mimeType,  exportDataCSVRef.current.filename,  exportDataCSVRef.current.fileExtension);
   }
   const handleDownloadTXT = () => { 
     tableRef.current &&  tableRef.current.export2file(exportDataTXTRef.current.data, exportDataTXTRef.current.mimeType, exportDataTXTRef.current.filename, exportDataTXTRef.current.fileExtension);
   }



  return (
    <div className="relative bg-white shadow-lg overflow-auto" >
    <div className="sticky left-0 top-0 bg-white z-20 flex justify-between  text-sm font-medium text-center text-gray-500 border-b border-gray-200">
      <ul className=" cursor-pointer flex ">
         { categoryList.map(item =>          
        <li className="mr-2">
           <a className={"inline-block p-4 rounded-t-lg border-b-2 " + (openTab === item
            ? "text-orange-500 hover:text-orange-600  border-orange-500"
            : "text-blueGray-700 hover:text-blueGray-500 hover:border-gray-300 ")}
            onClick={()=>setOpenTab(item)}
            >{item}</a>
        </li>        
        )}   
      </ul>    
      <div className="m-2">   
        <button       
        type="button" className=" py-2 text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-orange-500 focus:text-orange-500  transition  duration-150   ease-in-out" data-tooltip-target="tooltip-default" data-bs-placement="bottom" data-popper-arrow>
       
         <ViewerDownloadDropdown  xlsx={handleDownloadXLSX} txt={handleDownloadTXT} csv={handleDownloadCSV} />     
      </button>
      <button
        onClick={()=> deleteFromTable(openTab)}
        type="button" className="py-2 px-4 text-gray-900 bg-white border border-gray-200 hover:bg-gray-100  hover:text-orange-500  focus:text-orange-500  transition  duration-150   ease-in-out"data-tooltip-target="tooltip-default"  data-bs-placement="bottom" data-popper-arrow>
        <i className="fas fa-trash-alt"></i> 
      </button>
      <button 
     
      type="button" className="py-2 px-4 text-gray-900 bg-white border rounded-r-lg border-gray-200 hover:bg-gray-100 hover:text-orange-500  focus:text-orange-500  transition  duration-150   ease-in-out"  data-tooltip-target="tooltip-default"  data-bs-placement="bottom" data-popper-arrow>
        <i className="fas fa-pen"></i> 
      </button>
      </div>  
    </div>
    <div
    
     className=" p-2 overflow-contain" >    
      <ListProperties typeProps={table} category={openTab} />   
    </div>
  </div>
  )
}

export default BottomPanel