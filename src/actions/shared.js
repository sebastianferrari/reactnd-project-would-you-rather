import { getInitialData } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import { receiveUsers } from './users'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users }) => {
        dispatch(receiveUsers(users))
        //dispatch(receiveTweets(tweets))
        dispatch(hideLoading())
      })
  }
}