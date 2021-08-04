import { Component } from "react"
import { Link } from "react-router-dom"

class TaskListSummary extends Component {
  render() {
    return (
      <span>
        <Link to={`/task-lists/${this.props.taskList.id}`}>{this.props.taskList.name}</Link>
        <button onClick={() => this.props.handleDelete(this.props.taskList.id)}>delete</button>
      </span>
    )
  }
}

export default TaskListSummary;