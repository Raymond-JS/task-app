import React from "react"
import axios from "axios";
import clsx from "clsx"
import TaskForm from "./TaskForm.js"


export default function TaskDisplay(props) {
    const { _id, name, description, completed, editMode } = props.details
    const {handleDelete, setTask, handleEditToggle, onSubmit} = props;
   
        function completeTask(id) {
            axios.put(`/tasks/${id}`, { completed: !completed }).then(res => {
                setTask(prevToggle => prevToggle.map(task => {
                    if (task._id !== id) {
                        return task
                    }
                    return res.data
                }))
            })
            .catch(err => console.error(err))
    
        }

        const classes = clsx(
            {
                "crossed-off": completed
            })


    

    return (
        <>
        <div className="task"> 
        { editMode ? <TaskForm  btnText="Submit Edit" onSubmit={onSubmit} id={_id}/>
          :
          <>
          <h2 className={classes}>{name}</h2>
          <h3 className={classes}>Notes: {description}</h3>
          <div className="buttonsContainer ">
            <button className="clickable" onClick={() => completeTask(_id)}>&#10004;</button>
            <button className="clickable" onClick={() => handleDelete(_id)}>delete</button>
            <button className="clickable" onClick={() => handleEditToggle(_id)}>edit</button>
        </div>
        </>
          }
        
        
        
        </div>
        </>
    )
}