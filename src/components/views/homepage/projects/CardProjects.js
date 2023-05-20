import {useCallback}  from "react";
import {useHistory} from 'react-router-dom';


export default function CardProjects({model, name, description}) {

  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/projectpage'), [history]); 


  return (
    <>
  
      <div className="relative hover:scale-105 ease-in-out duration-300 overflow-hidden break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
        <a 
        href={ `#${model}#${name}` }
        onClick={handleOnClick} 
        > 
        
          <img
            alt="..."
           src={model ? require(`assets/img/${model}.png`).default :  require(`assets/img/3d-default.png`).default} 
            className=" h-48	 object-cover align-middle w-full border-none "
          />
          
          <div className="w-full px-4 my-3 ">      
           <dd className="group-hover:text-white font-semibold text-slate-900 ">
              {name}
            </dd>    
            <dd className ="pb-2  mb-10">{description}</dd>
       
            <div className="absolute bottom-0 mb-2">         
           
          </div>
           
           
          </div>
        </a>
      </div>
    </>
  );
}
