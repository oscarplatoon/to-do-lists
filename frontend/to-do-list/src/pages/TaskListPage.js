import { Component } from "react"
 import { Link } from "react-router-dom"
 // api
 import toDoAPI from "../api/toDoAPI"
 // contexts
 import UserContext from "../contexts/UserContext"

 class TaskListPage extends Component {
   state = {
     taskList: null
   }

   // helper methods
   async getTaskList() {
     try {
       let taskListId = this.props.match.params.taskListId
       let token = this.context 
         ? this.context.token
         : null
       let taskListData = await toDoAPI.getTaskListById(taskListId, token)
       if (taskListData) {
         this.setState({ taskList: taskListData })
       }
     }
     catch (error) {
       console.log(error)
     }
   }

   addTask = async () => {
     try {
       let inputName = document.getElementById("new-task-name")
       let inputDueDate = document.getElementById("new-task-due-date")
       let token = this.context 
         ? this.context.token
         : null
       if (inputName && inputDueDate && token) {
         let newTaskParams = {
           list: this.state.taskList.id,
           name: inputName.value,
           due_date: inputDueDate.value,
           completed: false
         }
         let data = await toDoAPI.createTask(newTaskParams, token)
         if (data) {
           this.getTaskList()
         }
       }
     }
     catch {

     }
   }

   // life cycle
   componentDidMount() {
     this.getTaskList()
   }

   // render
   renderTasks() {
     let taskElements = this.state.taskList.tasks.map((task, index) => {
       return (
         <li key={`task-${index}`}>
           <Link to={`/task-lists/${this.state.taskList.id}/tasks/${task.id}`}>{task.name}</Link>
         </li>
       )
     })


     return (
       <ul className="simple-list">
         { taskElements }
       </ul>
     )
   }

   renderTaskList() {
     if (!this.state.taskList) {
       return <p>No task list found!</p>
     }

     return (
       <div>
         <h1>{this.state.taskList.name}</h1>
         <h3>{this.state.taskList.user}</h3>
         { this.renderTasks() }
         <hr />
         <input id="new-task-name" placeholder="new task"/>
         <input id="new-task-due-date" placeholder="due date"/>
         <button onClick={this.addTask}>Add Task</button>
       </div>
     )
   }

   render() {
     return (
       <div>
         <h1>Task List Page: { this.props.match.params.taskListId } </h1>
         { this.renderTaskList() }
       </div>
     )
   }
 }

 TaskListPage.contextType = UserContext

 export default TaskListPage;