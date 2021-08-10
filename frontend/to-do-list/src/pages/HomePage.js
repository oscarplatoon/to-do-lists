import { Component } from "react"
 import { Link } from "react-router-dom"
 // api
 import toDoAPI from "../api/toDoAPI"
 // components
 import TaskListSummary from "../components/TaskListSummary"
 // contexts
 import UserContext from "../contexts/UserContext"

 class HomePage extends Component {
   state = {
     taskLists: []
   }


   // helper methods
   getTaskLists = async () => {
     try {
       let token = this.context
         ? this.context.token
         : null
       if (token) {
         let taskListsData = await toDoAPI.getTaskLists(token)
         this.setState({ taskLists: taskListsData })
       }
     }
     catch {

     }
   }

   createTaskList = async () => {
     let input = document.getElementById("new-task-list-name")
     let token = this.context
         ? this.context.token
         : null
     if (input && token) {
       let newTaskListParam = {
         name: input.value,
         user: this.context.user.id
       }
       let data = await toDoAPI.createTaskList(newTaskListParam, token)
       console.log("new task list", data)
       if (data) {
         let newTaskLists = [...this.state.taskLists, data]
         this.setState({taskLists: newTaskLists})
       }
     }
   }

   deleteTaskList = async (taskListId) => {
     try {
       let token = this.context
         ? this.context.token
         : null
       if (taskListId > 0 && token) {
         let result = await toDoAPI.deleteTaskList(taskListId, token)
         if (result.success) {
           let newTaskLists = this.state.taskLists.filter((taskList, index) => {
             return taskList.id !== taskListId
           })
           this.setState({taskLists: newTaskLists})
         }
       }
     }
     catch {

     }
   }

   // life cycles
   componentDidMount() {
     this.getTaskLists()
   }

   // render
   renderWelcome() {
     if (!this.context) {
       return <Link to="/login"><button>Login</button></Link>
     }

     let taskListElements = this.state.taskLists.map((taskList, index) => {
       return ( 
         <li key={`task-list-${index}`}>
           <TaskListSummary taskList={taskList} handleDelete={this.deleteTaskList}/>
         </li>
       )
     })

     return (
       <div>
         <h2>Welcome to your Task List Manager App {this.context.user.username}!</h2>
         <h2>Your task lists:</h2>
         <ul className="simple-list">
           { taskListElements }
         </ul>
         <hr />
         <input id="new-task-list-name" placeholder="new task list"/>
         <button onClick={this.createTaskList}>Create New Task List</button>
       </div>
     )
   }

   render() {
     return (
       <div>
         <h1>Home Page</h1>
         { this.renderWelcome() }
       </div>
     )
   }
 }

 HomePage.contextType = UserContext

 export default HomePage