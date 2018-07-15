import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>Dashboard</h3>
        <br />
        {this.props.unansweredQuestionIds.map((id) => (
          <p key={id}>
            {id}
          </p>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ questions }) {
  return {
    unansweredQuestionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)