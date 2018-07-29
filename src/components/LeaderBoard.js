import React, { Component } from 'react'
import { connect } from 'react-redux'
import LeaderBoardItem from './LeaderBoardItem';
import { values } from '../utils/helpers'
import './LeaderBoard.css'

class LeaderBoard extends Component {
  render() {
    const { users, sortedUsers } = this.props

    return (
      <div className='leaderboard-list'>
        {sortedUsers.map(user => (
          <LeaderBoardItem key={users[user].id} user={users[user]} />
        ))}
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users,
    sortedUsers: Object.keys(users).sort((a,b) => 
      (users[b].questions.length + Object.keys(users[b].answers).length) 
      - 
      (users[a].questions.length + Object.keys(users[a].answers).length)
    )
  }
}

export default connect(mapStateToProps)(LeaderBoard)