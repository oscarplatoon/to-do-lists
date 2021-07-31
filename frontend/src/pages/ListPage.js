import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getListByID, getTasksByIDs } from '../api/UserAPI';
import { Link } from 'react-router-dom';

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

    const renderTasks = () => {
        const taskDivs = tasks.map(task => {
            return (
                <li key={task.id}>
                    <h3>{task.task_name}</h3>
                    <p>{task.completed ? 'Completed!' : 'Click to complete'}</p>
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
        </div>
    )
}

export default ListPage;