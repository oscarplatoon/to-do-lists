import { Link } from 'react-router-dom';
import Lists from '../components/Lists/Lists';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const HomePage = ({ isLoggedIn, handleLogout, getListByID }) => {
    const user = useContext(UserContext);

    return (
        <div>
            <h1>Home</h1>
            {
                user &&
                <div>
                    Hi {user.username}!
                    <hr />
                    <Lists user={user} />
                </div>
            }
            {
                !isLoggedIn
                    ?
                    <div>
                        <div>
                            <Link to='/login'>Login</Link>
                        </div>
                        <div>
                            <Link to='/signup'>Signup</Link>
                        </div>
                    </div>
                    :
                    <button onClick={handleLogout}>Logout</button>
            }
        </div>
    );
};

export default HomePage;
