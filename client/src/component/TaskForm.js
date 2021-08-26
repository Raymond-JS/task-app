import React, {useState} from "react"


export default function TaskForm(props) {
    const config = {
        name: "",
        description: "",
        completed: false,
        editMode: false
    }
    const [newTask, setNewTask] = useState(config)


    const {onSubmit} = props;
    
    function handleChange(event) {
        const {name, value} = event.currentTarget;
        setNewTask(prevTask => (
            {...prevTask,
            [name]: value}))

    }
    
    function handleSubmit(e) {
        e.preventDefault()
        // post request
        onSubmit(newTask, props.id)
      
    }
     
     return (
         <>
          
         <form className="formStyle" onSubmit={handleSubmit}>  
            <input type="text" placeholder="Enter task" name="name" onChange={handleChange} /> 
            <textarea name="description" placeholder="notes..." onChange={handleChange}></textarea>
           <button className="current">{props.btnText}</button> 
         </form>
         </>
     )

}