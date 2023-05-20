import { useContext, useState } from "react";
import { ViewerContext } from "context/ViewerContext";;


const CommentContextMenu = ( ) => {

  const {nameSelected, setShowComment, addNewComment } =useContext(ViewerContext); 
  const [newComment, setNewComment] = useState('')

  const handleInputChange =(e) => { 
    setNewComment(e.target.value)
    
   }
  const handleSubmit = (e) => { 
    e.preventDefault()  
    addNewComment({
      element: nameSelected,
      autor: 'Manuela Cepeda', //replace with user
      comment: newComment
    })
    setShowComment(false)
   }

  const handleClick = () => { setShowComment(false) }
  return (
      <>
     < div className='px-5  text-xs py-2  shadow-lg'>
      <div className="items-center flex gap-2 mb-5">
          <span className="w-8 h-8  text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("assets/img/perfil.png").default}
            />
          </span>
           <p className=' text-sm font-bold '> Manuela Cepeda </p>
        </div>
      <form >
      <label
        className="block text-blueGray-600 text-xs  mb-2"
        
        >
        New comment on: <span className='font-bold'>{nameSelected}</span> 
        </label>
        <input
        type="text"
        placeholder='Add a Comment '
        className="mb-3 border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        onChange={handleInputChange} 
        />
        <div className="flex items-center">
        
            <button
            className="bg-orange-500 text-white active:bg-lightBlue-600 font-bold uppercase  px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleSubmit}
            >
            Save Changes
            </button>
                <button
            className="text-red-500 background-transparent font-bold uppercase px-4 py-2  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleClick}
            >
            Close
            </button>
        </div>
      
        

      </form>
      </div>
    </>
  )
}

export default CommentContextMenu
