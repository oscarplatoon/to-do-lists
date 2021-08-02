const BASE_URL = 'http://localhost:8000/'

const login = (userObject) => {
    return fetch(BASE_URL + 'get-token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObject)
    }).then(res => res)
};


const signupUser = (userObject) => {
    return fetch(BASE_URL + 'users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObject)
    }).then(res => res)
};

const getLoggedInUser = (token) => {
    return fetch(BASE_URL + 'current-user/', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
        }
    }).then(res => res)
};

const getListByID = async (listID, token) => {
    const response = await fetch(`${BASE_URL}lists/${listID}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
        }
    })
    const data = await response.json();
    return data
}

const getTasksByIDs = async (arrOfIDs, token) => {
    if (!arrOfIDs) return;

    let arrToReturn = [];

    for (const taskID of arrOfIDs) {
        const response = await fetch(`${BASE_URL}tasks/${taskID}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${token}`
            }
        })
        const data = await response.json();
        arrToReturn.push(data);
    }

    return arrToReturn;
}

const markTaskAsCompleted = async (taskObj, token) => {
    const taskID = taskObj.id;
    const updatedTaskObj = {
        id: taskID,
        task_name: taskObj.task_name,
        completed: true,
        due_date: taskObj.due_date,
        list: taskObj.list
    }

    const response = await fetch(`${BASE_URL}tasks/${taskID}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
        },
        body: JSON.stringify(updatedTaskObj)
    })

    const data = await response.json();
    return data;
}

const createNewTask = async (newTodoObj, token) => {
    const response = await fetch(`${BASE_URL}tasks/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
        },
        body: JSON.stringify(newTodoObj)
    })
    const data = await response.json();
    return data;
}

const editTask = async (editedTodoObj, token) => {
    const response = await fetch(`${BASE_URL}tasks/${editedTodoObj.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
        },
        body: JSON.stringify(editedTodoObj)
    })
    const data = await response.json();
    return data;
}

const deleteTask = async (taskID, token) => {
    const response = await fetch(`${BASE_URL}tasks/${taskID}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
        }
    })
    const data = await response.json();
    return data;
}

export { login, getLoggedInUser, signupUser, getListByID, getTasksByIDs, markTaskAsCompleted, createNewTask, editTask, deleteTask }

