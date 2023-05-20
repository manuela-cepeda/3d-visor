import ViewerContextProvider from "context/ViewerContext";

// components
import Viewer from "./workspace/Viewer/Viewer.js";
import BottomPanel from "./workspace/BottomPanel/BottomPanel";
import LeftPanel from "./workspace/LeftPanel/LeftPanel";
import RightPanel from "./workspace/RightPanel/RightPanel";

import Split from 'react-split'
import 'assets/styles/split.css';
import { useParams } from "react-router-dom";

export default function Workspace() {
  const {model} = useParams(); 
  return (
    <>
     <ViewerContextProvider>  
        <Split direction='vertical'  sizes={[70,30]} style={{height: 'calc(100vh - 8rem)'}}  >
      
        <Split  sizes={[20, 60, 20]} minSize={[250, 250, 250]} className="flex">           
          <LeftPanel  />           
          <Viewer  model={model} />  
          <RightPanel  />       
        </Split>
    
         <BottomPanel /> 
        </Split>
     
         
       
      </ViewerContextProvider>
    </>
  ); 
}
