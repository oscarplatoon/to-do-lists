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
    const response = await fetch(`${BASE_URL}lists/${listID}`, {
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
    let arrToReturn = [];

    for (const taskID of arrOfIDs) {
        const response = await fetch(`${BASE_URL}tasks/${taskID}`, {
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


export { login, getLoggedInUser, signupUser, getListByID, getTasksByIDs }

