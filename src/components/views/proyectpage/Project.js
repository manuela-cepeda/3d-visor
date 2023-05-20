import { useCallback } from "react";
import { useHistory, Link} from "react-router-dom";

// components
import InfoCard from "components/common/InfoCard";
import ProjectViewerMin from "./project/ViewerMin";


export default function Project() {  
  const frag = window.location.hash.substr(1);
  const history = useHistory();
 
  return (
    <>    
      <div className="flex flex-wrap ">      
        <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 px-4">
        <div className="flex flex-wrap">        
        <div className="w-full pb-5 cursor-pointer"
               onClick={useCallback(() => history.push(`/projectpage/settings#${frag}`), [history])}
              >
               
                <InfoCard
                                  
                  statSubtitle="Notifications"                
                  statIconName="fas fa-bell"
                  statDescripiron="See all"
                  statIconColor="bg-orange-400"
                />
              </div>
          <Link
           to={`/projectpage/workspace#${frag}`}
          //  onDoubleClick={useCallback(() => history.push(`/projectpage/viewer#${frag}`), [history])} 
           className=" w-full overflow-hidden">
            <ProjectViewerMin className='relative'  />     
          </Link>  
          </div>  
           {/* Card stats */}
        
           <div className="grid grid-cols-2 gap-2">
           <div className="col-span-2 w-full  px-4">
               <InfoCard
                 statTitle='50%'
                 statSubtitle="Project Current 
                 Status & 
                 Milestones"            
                 statIconName="fas fa-chart-line" 
                 statIconColor="bg-orange-400"
               />
             </div>

              <div className="w-full px-4 cursor-pointer"
               onClick={useCallback(() => history.push(`/projectpage/settings#${frag}`), [history])}
              >
                <InfoCard
                                  
                  statSubtitle="Project 
                  Information & 
                  Settings"                
                  statIconName="fas fa-tools"
                  // statDescripiron="See all"
                  statIconColor="bg-orange-400"
                />
              </div>
              <div className="w-full px-4">
                <InfoCard
                  statSubtitle="Tender actions"       
                  statIconName="fa fa-money-check" 
                  statIconColor="bg-orange-400"
                />
              </div>
         
              <div className="w-full  px-4">
                <InfoCard                 
                  statSubtitle="Project 
                  attached 
                  documents"                  
                  statIconName="far fa-file"
                  statIconColor="bg-orange-400"
                />
              </div>
            

              <div className="w-full  px-4">
                <InfoCard
                 
                  statSubtitle="Bimetica Project Folder"               
                  statIconName="fas fa-folder" 
                  statIconColor="bg-orange-400"
                />
              </div>
             
              <div className="w-full px-4">
                <InfoCard
                  statSubtitle="Upload / 
                  Download Project 
                  Files"    
                  statIconName="fa fa-upload"
                  statIconColor="bg-orange-400"
                />
              </div>
        
           
             
              
              <div className="w-full px-4 cursor-pointer"
                 onClick={useCallback(() => history.push(`/projectpage/members#${frag}`), [history])}>
                <InfoCard             
                  statSubtitle="Teams & Contacts"                 
                  statIconName="fas fa-users"               
                  statIconColor="bg-orange-400"
                />
              </div>
             
             




            </div>
       
        </div>
     
      </div>

    </>
  );
}
