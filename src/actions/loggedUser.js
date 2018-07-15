export const SET_LOGGED_USER = 'SET_LOGGED_USER'

function setLoggedUser (loggedUser) {
  return {
    type: SET_LOGGED_USER,
    loggedUser
  }
}

export function handleSetLoggedUser(loggedUser) {
  return (dispatch) => {
    dispatch(setLoggedUser(loggedUser))
  }
}