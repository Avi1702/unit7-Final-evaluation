import React from 'react'
import axios from "axios"

export const Todo = () => {

   const [task,setTask]=React.useState("")
   const [tag,setTag]=React.useState("")

    function addTodo() {
        console.log(task, tag)
        axios({
            method: "post",
            url: "/todo",
            headers:{
            "Content-type":"application/json"},
            body: JSON.stringify({
                task,
                status: false,
                tag
            })
        })
            .then((res) => { console.log(res) })
            .catch((err) => console.log(err))

        window.alert("task added")
    }
  return (
    <div>
        <h1>Todos</h1>
       <form>
        <input type={"text"} placeholder={"add todo"} value={task} onChange={(e)=>{setTask(e.target.value)}}></input><br/>
        <input type={"text"} placeholder={"add tag (ex: personal,family)"} value={tag} onChange={(e)=>{setTag(e.target.value)}}></input><br/>
        <input type={"button"} value={"ADD"} onClick={addTodo}></input>
       </form>
    </div>
  )
}
