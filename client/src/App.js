import React, {useState, useEffect} from "react"
import axios from "axios"
import TaskDisplay from "./component/TaskDisplay.js"
import TaskForm from "./component/TaskForm.js"
import "./styles.css"
import { Switch, Route, Link, useHistory } from "react-router-dom"



export default function App() { 
    const [tasks, setTask] = useState([])

    let history = useHistory()

    
    useEffect(() => {
        axios.get("/tasks").then(res => { 
            setTask(res.data)
            
        }).catch(error => console.error(error))

    }, [])

    function addTask( newTask) {
        axios.post(`/tasks`, newTask).then(res => {
            setTask(prevTask => [...prevTask, res.data])
            history.push("/")
        })
        .catch(err => console.log(err))
    }


    function deleteTask(id) {
        axios.delete(`/tasks/${id}`).then(res => {
            console.log(res)
            setTask(prevTask => prevTask.filter(task => task._id !== id))
        })
          .catch(error => console.error(error))

    }

    
    function toggleTask( id, editMode) {
        axios.put(`/tasks/${id}`, { editMode: !editMode }).then(res => {
            setTask(prevTasks => prevTasks.map(task => {
                if (task._id !== id) {
                    return task
                }
                return res.data
            }))
        })
        .catch(err => console.error(err))
    }


    function editTask(newTask, id) {
        axios.put(`/tasks/${id}`, newTask).then(res => {
            setTask(prevTasks => prevTasks.map(task => {
                if (task._id !== id) {
                    return task
                }
                return res.data
            }))
        })
        .catch(err => console.error(err))
    }


    return (
        <>
        
        <Link to="/task">Add Task</Link>
        
        <Switch>
            <Route path="/task">
                <TaskForm 
                    onSubmit={addTask}  
                    btnText="Submit" 
                    />
            </Route>
        </Switch>

        <div className="container"> 

        { tasks.map( task => <TaskDisplay 
                                details={task}  
                                key={task._id} 
                                handleDelete={deleteTask}
                                setTask={setTask}
                                handleEditToggle={toggleTask}
                                onSubmit={editTask}
                                />)
                                }
                                
        </div>
        



        </>
    )
}