import { Container, Navbar } from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import { useContext } from 'react';

function NavigationBar() {
    const user = useContext(UserContext);

    return (
        <Navbar bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href="/">ToDo Lists</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {user && <span>Signed in as: <a href="/login">{user.username}</a></span>}
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;