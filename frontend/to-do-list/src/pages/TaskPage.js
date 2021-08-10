import { Component } from "react";
import toDoAPI from '../api/toDoAPI'

class TaskPage extends Component {

  state = {
    task: null
  }

   // helper methods
   async getTask() {
    try {
      let taskId = this.props.match.params.taskId
      let taskData = await toDoAPI.getTaskById(taskId)
      if (taskData) {
        this.setState({ task: taskData })
      }
    }
    catch (error) {
      console.log(error)
    }
  }

    // life cycle
    componentDidMount() {
      this.getTask()
    }

    // render
    renderTask() {
      if (!this.state.task) {
        return <p>No task found!</p>
      }
  
      return (
        <div>
          <h1>List: {this.state.task.list}</h1>
          <h2>Name: {this.state.task.name}</h2>
          <h3>Completed: {this.state.task.completed ? "Yes" : "No"}</h3>
          <h3>Due: {this.state.task.due_date}</h3>
        </div>
      )
    }



  render() {
    return (
      <div>
        <h1>Task Page: { this.props.match.params.taskId }</h1>
        { this.renderTask() }
      </div>
    )
  }
}

export default TaskPage;