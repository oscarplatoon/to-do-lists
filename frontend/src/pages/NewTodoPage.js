import { useParams, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { createNewTask } from '../api/UserAPI';


function NewTodoPage(props) {
    const { listID } = useParams();
    const token = localStorage.getItem('token');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const todo_name = event.target.elements[0].value;
        const due_date = event.target.elements[1].value;
        const completed = event.target.elements[2].checked;
        const newTodoObj = {
            "task_name": todo_name,
            "completed": completed,
            "due_date": due_date,
            "list": parseInt(listID)
        }
        createNewTask(newTodoObj, token);
        props.history.push(`/lists/${listID}/`);
    }

    const renderForm = () => {
        return (
            <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name of Todo</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="text" placeholder='e.g. 2002-08-11' />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check type="checkbox" label="Completed?" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }

    return (
        <div>
            <h1>Create a new Todo</h1>
            <Link to={`/lists/${listID}/`}>Back to list</Link>
            <hr />
            {renderForm()}
        </div>
    )
}

export default NewTodoPage;