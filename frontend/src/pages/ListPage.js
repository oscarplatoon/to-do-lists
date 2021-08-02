import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getListByID, getTasksByIDs } from '../api/UserAPI';
import { Link } from 'react-router-dom';
import { markTaskAsCompleted, deleteTask } from '../api/UserAPI';

function ListPage() {
    const { listID } = useParams();
    const [list, setList] = useState(null);
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem('token');  // change to context

    useEffect(() => {
        const getListByIDAsync = async () => {
            const listObj = await getListByID(listID, token);
            setList(listObj);
        }
        if (localStorage.getItem('token')) {
            getListByIDAsync();
        }
    }, [])

    useEffect(() => {
        if (list === null) return;

        const setTasksAsync = async () => {
            const arrOfTasks = await getTasksByIDs(list.tasks, token);
            setTasks(arrOfTasks);
        }

        setTasksAsync();
    }, [list])

    const handleCompletionClick = (taskObj) => {
        markTaskAsCompleted(taskObj, token);
        window.location.reload();
    }

    const handleDeletionClick = (taskID) => {
        deleteTask(taskID, token);
        window.location.reload();
    }

    const renderTasks = () => {
        const taskDivs = tasks.map(task => {
            return (
                <li key={task.id}>
                    <h3>{task.task_name}</h3>
                    <Link to={`/lists/${listID}/tasks/${task.id}/edit`}>Edit</Link>
                    &nbsp;&nbsp;
                    <Link to='#' onClick={() => handleDeletionClick(task.id)}>Delete</Link>
                    <br />
                    {task.completed ? <span>Completed!</span> : <Link onClick={() => handleCompletionClick(task)} to={`${listID}/`}>Click to complete</Link>}
                    <p>Due Date: {task.due_date}</p>
                </li>
            )
        })
        return taskDivs;
    }

    return (
        <div>
            {list && <h1>List: {list.list_name}</h1>}
            <Link to='/'>Home</Link>
            <hr />
            <ul>
                {tasks && renderTasks()}
            </ul>
            <hr />
            <Link to={`/lists/${listID}/new/`}>Create New ToDo</Link>
        </div>
    )
}

export default ListPage;