import { Component } from "react"
// api
import toDoAPI from "../api/toDoAPI"
// contexts
import UserContext from "../contexts/UserContext"



class TaskPage extends Component {
    static MODE_TYPE = {
      VIEW: 1,
      UPDATE: 2,
    }
  
    state = {
      task: null,
      mode: TaskPage.MODE_TYPE.VIEW
    }

  // helper methods
  async getTask() {
    try {
      let taskId = this.props.match.params.taskId
      let token = this.context 
        ? this.context.token
        : null
      let taskData = await toDoAPI.getTaskById(taskId, token)
      if (taskData) {
        this.setState({ task: taskData })
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  
  changeMode = (newMode) => {
    this.setState({mode: newMode})
  }

  updateTask = async () => {
    try {
      let inputName = document.getElementById("task-name")
      let inputCompleted = document.getElementById("task-completed")
      let inputDueDate = document.getElementById("task-due-date")

      let taskId = this.state.task.id
      let token = this.context 
        ? this.context.token
        : null
      if (inputName && inputCompleted && inputDueDate && taskId > 0 && token) {
        let updatedTask = {
          list: this.state.task.list,
          name: inputName.value,
          completed: inputCompleted.checked,
          due_date: inputDueDate.value
        }
        
        let data = await toDoAPI.updateTask(taskId, updatedTask, token)
        if (data) {
          this.setState({task: data})
          this.changeMode(TaskPage.MODE_TYPE.VIEW)
        }
      }     
    }
    catch {

    }
    
  }

  deleteTask = async () => {
    try {
      let taskListId = this.state.task.list
      let taskId = this.state.task.id
      let token = this.context
        ? this.context.token
        : null
      if (taskId > 0 && token) {
        let result = await toDoAPI.deleteTask(taskId, token)
        if (result.success) {
          this.props.history.push(`/task-lists/${taskListId}/`)
        }
      }
    }
    catch {

    }
  }

  // life cycles
  componentDidMount() {
    this.getTask()
  }

  // render
  renderTask() {
    if (!this.state.task) {
      return <p>No task found!</p>
    }

    if (this.state.mode === TaskPage.MODE_TYPE.UPDATE) {
      return (
        <div>
          <div>
            <h1 className="nonbreak">Name: </h1>
            <input id="task-name" placeholder="name" defaultValue={this.state.task.name}/>
          </div>
          <div>
            <h3 className="nonbreak">Done: </h3>
            <input id="task-completed" type="checkbox" defaultChecked={this.state.task.completed}/>
          </div>
          <div>
            <h3 className="nonbreak">Due Date: </h3>
            <input id="task-due-date" placeholder="due date" defaultValue={this.state.task.due_date}/>
          </div>
          <br />
          <button onClick={this.updateTask}>Save</button>
          <button onClick={() => this.changeMode(TaskPage.MODE_TYPE.VIEW)}>Cancel</button>
        </div>
      )
    }

    return (
      <div>
        <h1>Name: {this.state.task.name}</h1>
        <h3>Done: {this.state.task.completed ? "YES" : "NO"}</h3>
        <h3>Due: {this.state.task.due_date}</h3>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Task Page: { this.props.match.params.taskId } </h1>
        { this.renderTask() }
        <hr />
        <button onClick={() => this.changeMode(TaskPage.MODE_TYPE.UPDATE)}>Update</button>
        <button onClick={this.deleteTask}>Delete</button>
      </div>
    )
  }
}

TaskPage.contextType = UserContext

export default TaskPage;