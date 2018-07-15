import { getInitialData } from '../utils/api'
// import { setLoggedUser } from './loggedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveUsers } from './users'

// const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, tweets }) => {
        dispatch(receiveUsers(users))
        //dispatch(receiveTweets(tweets))
        //dispatch(setLoggedUser(''))
        dispatch(hideLoading())
      })
  }
}