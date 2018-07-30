import React from 'react'
import LeaderBoardItem from './LeaderBoardItem';
import './LeaderBoard.css'

const getSortedUsers = (users) => {
  if (users && Object.keys(users).length > 0) {
    return Object.keys(users).sort((a, b) =>
      (users[b].questions.length + Object.keys(users[b].answers).length)
      -
      (users[a].questions.length + Object.keys(users[a].answers).length)
    )
  }
  return []
}

const LeaderBoard = (props) => {
  console.log('USERS====> ', props)
  const sortedUsers = getSortedUsers(props.users)
  return (
    <div className='leaderboard-list'>
      {sortedUsers.map(user => (
        <LeaderBoardItem key={props.users[user].id} user={props.users[user]} />
      ))}
    </div>
  )
}

export default LeaderBoard