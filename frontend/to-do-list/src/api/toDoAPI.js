const BASE_URL = "http://localhost:8000/"

const getTokenInit = (token) => {
  return {
      headers: {
        'Content-Type': 'application/json',
        "authorization": `JWT ${token}`
      }
  }
}

const tryCatchFetch = async (url, init) => {
  try {
    let response = await fetch(url, init)
    if (response.ok) {
      console.log("status", response.status)
      if (response.status !== 204) { // 204 doesn't have a message body
        let data = await response.json()
        return data
      }
      else {
        return { "success": true }
      }
    }
  }
  catch (error) {
    console.error(":ERR:",error)
    return null
  }
}



const doLogin = async (credentials) => {
  let url = `${BASE_URL}login/`
  let init = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }
  return await tryCatchFetch(url, init)
}


const getTaskLists = async (token) => {
  let url = `${BASE_URL}api/task-lists/`
  return await tryCatchFetch(url, getTokenInit(token))
}


const getTaskListById = async (taskListId, token) => {
  let url = `${BASE_URL}api/task-lists/${taskListId}/`
  return await tryCatchFetch(url, getTokenInit(token))
}


const getTaskById = async (taskId, token) => {
  let url = `${BASE_URL}api/tasks/${taskId}/`
  return await tryCatchFetch(url, getTokenInit(token))
}

const createTaskList = async (newTaskListParams, token) => {
  let url = `${BASE_URL}api/task-lists/`
  let init = getTokenInit(token)
  init["method"] = "POST"
  init["body"] = JSON.stringify(newTaskListParams)
  return await tryCatchFetch(url, init)
}

const deleteTaskList = async (taskListId, token) => {
  let url = `${BASE_URL}api/task-lists/${taskListId}/`
  let init = getTokenInit(token)
  init["method"] = "DELETE"
  return await tryCatchFetch(url, init)
}

const createTask = async(newTaskParams, token) => {
  let url = `${BASE_URL}api/tasks/`
  let init = getTokenInit(token)
  init["method"] = "POST"
  init["body"] = JSON.stringify(newTaskParams)
  return await tryCatchFetch(url, init)
}

const updateTask = async(taskId, updatedTaskParams, token) => {
  let url = `${BASE_URL}api/tasks/${taskId}/`
  let init = getTokenInit(token)
  init["method"] = "PUT"
  init["body"] = JSON.stringify(updatedTaskParams)
  return await tryCatchFetch(url, init)
}

const deleteTask = async (taskId, token) => {
  let url = `${BASE_URL}api/tasks/${taskId}/`
  let init = getTokenInit(token)
  init["method"] = "DELETE"
  return await tryCatchFetch(url, init)
}

const myExport = {
  doLogin,
  getTaskLists,
  getTaskListById,
  getTaskById, 
  createTaskList,
  deleteTaskList,
  createTask,
  updateTask,
  deleteTask
}

export default myExport