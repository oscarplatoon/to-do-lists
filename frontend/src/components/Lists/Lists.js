import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import { useContext } from 'react';

function Lists() {
    const user = useContext(UserContext);

    const renderLists = () => {
        const listItems = user.lists.map((list, index) => {
            return <li key={list.id}><Link to={`/lists/${list.id}`} key={index + 1}>{list.list_name}</Link></li>
        })
        return listItems;
    }

    return (
        <div>
            <h3>Your Lists</h3>
            <ul>
                {user && renderLists()}
            </ul>
        </div>
    )
}

export default Lists;