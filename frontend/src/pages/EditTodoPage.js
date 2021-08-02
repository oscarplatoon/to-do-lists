import { useParams, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { getTasksByIDs, editTask } from '../api/UserAPI';


function EditTodoPage(props) {
    const { listID, taskID } = useParams();
    const token = localStorage.getItem('token');
    const [todoObj, setTodoObj] = useState(null);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const todo_name = event.target.elements[0].value;
        const due_date = event.target.elements[1].value;
        const completed = event.target.elements[2].checked;
        const editedTodoObj = {
            "task_name": todo_name,
            "completed": completed,
            "due_date": due_date,
            "list": parseInt(listID),
            "id": taskID
        }
        editTask(editedTodoObj, token);
        props.history.push(`/lists/${listID}/`);
    }

    const renderForm = () => {
        if (todoObj === null) {
            return <p>An error has occurred!</p>
        }

        return (
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name of Todo</Form.Label>
                    <Form.Control type="text" defaultValue={todoObj.task_name} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="text" defaultValue={todoObj.due_date} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Completed?" defaultChecked={todoObj.completed} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }

    useEffect(() => {
        const setTasksAsync = async () => {
            const data = await getTasksByIDs([taskID], token);
            setTodoObj(data[0]);  // gotta set right after the API call. otherwise, it sets the promise, not the actual object
        }

        if (todoObj === null) {
            setTasksAsync();
        }
    }, [])

    return (
        <div>
            <h1>Edit a Todo</h1>
            <Link to={`/lists/${listID}/`}>Back to list</Link>
            <hr />
            {renderForm()}
        </div>
    )
}

export default EditTodoPage;