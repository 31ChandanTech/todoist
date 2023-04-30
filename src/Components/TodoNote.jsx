import React from 'react';
import "./TodoNote.css";


const TodoNote = ({todosList,onEdit,onDel}) => {

  return (
    <div className='todonote_container'>
        <div className="notes">
            <div className="s_no">S-No</div>
            <div className="Notes">Notes</div>
            <button className="Edit">Edit</button>
            <button className="Delete">Delete</button>
        </div>
        {
          todosList.map((elem,index)=>{
            return <div className="notes" key={elem.id}>
            <div className="s_no">{index+1}</div>
            <div className="Notes">{elem.name}</div>
            <button className="Edit" onClick={()=> onEdit(elem.id)}><i class="fa-solid fa-pen-to-square"></i></button>
            <button className="Delete" onClick={()=> onDel(elem.id)}><i class="fa-solid fa-trash-can"></i></button>
        </div>
          })
        }
    </div>
  )
}

export default TodoNote;