import ViewerCommentDropdown from "./ViewerCommentDropdown";
import { ViewerContext } from "context/ViewerContext";
import React, { useContext, useState } from "react";



 const  Comments =  () => {

  const {comments, addNewResponse } =useContext(ViewerContext); 
  const [newResponse, setNewResponse] = useState('')
  const [valInput, setValInput] =  useState('')
    //handle opcions
    const handleInputChange =(e) => {
      setValInput(e.target.value) 
      setNewResponse(e.target.value)
      
     }

    const handleSubmit = (e, i) => { 
      e.preventDefault()  
      if(newResponse !== ''){
      addNewResponse(i, {  
        autor: 'Chris Bernal', //replace with user
        response: newResponse
      })
      }
      setValInput('')
     }

  return (
    <>
      { comments.map( (comment,i ) =>
        <div key={i} className=" flex flex-col min-w-0 break-words w-full ">
          {/* <p className="p-4 text-sm" >Select an element to add comments</p> */}

     < div className=' m-5 px-5  text-xs py-2 rounded shadow-lg border border-blueGray-200 '>
       <div className=" flex justify-between items-center  my-3"> 
        <div className="items-center flex gap-2">
          <span className="w-8 h-8  text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("assets/img/perfil.png").default}
            />
          </span>
          <div>
             <p className=' text-base font-bold float-left'> {comment.autor} </p>
            <p >        
              20/04/2022 17:50 {/* cambiar */}
            </p>
          </div>
           
        </div>
        <ViewerCommentDropdown index ={i} />
        </div>
       <p className="   mb-2">
        New comment on element: <span className='font-bold'>{comment.element}</span> 
        </p>
        <p className="text-base font-bold   mb-2">
        { comment.comment}
        </p>
       
       { 
        comment.answers?.map( response =>
          <>
          <div className="items-center flex gap-2 mt-4 mb-2">
          <span className="w-8 h-8  text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("assets/img/perfil.png").default}
            />
          </span>
          <div>
           <p className=' text-sm font-bold '> {response.autor} </p>
           <p>        
            20/04/2022 17:50 {/* cambiar */}
            </p>
          </div>
        </div>
        <p className="text-sm  pl-11 mb-1">
        { response.response}
        </p>
       
        </>
        )}




        <form className="mt-2 ">
    
          <div className="flex intems-center my-5 gap-3 "> 
          <span className="w-8 h-8  text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("assets/img/perfil.png").default}
            />
          </span>
         
        <input
        type="text"
        value={valInput}
        placeholder='Add a new Comment '
        className=" border-0  px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        onChange={handleInputChange}
        />
         </div>
        <div className="flex items-center">
        
            <button
            className="bg-orange-500 text-white active:bg-lightBlue-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={(e)=> handleSubmit(e, i)}
            >
            Save Changes
            </button>
         
        </div>
      
        

      </form>
      </div>      
          </div>
    )}
    </>
  );
}


export default Comments;
