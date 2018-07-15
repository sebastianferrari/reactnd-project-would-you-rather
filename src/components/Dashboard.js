import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPreview from './QuestionPreview'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>Dashboard</h3>
        <br />
        {this.props.unansweredQuestionIds.map((id) => {
          const question = this.props.questions[id]
          return (
            <QuestionPreview 
              key={id} 
              question={question} 
              userAvatar={this.props.users[question.author].avatarURL}
              userFullName={this.props.users[question.author].name}
            />
        )})}
      </div>
    )
  }
}

function mapStateToProps({ questions, users }) {
  return {
    unansweredQuestionIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    questions,
    users
  }
}

export default connect(mapStateToProps)(Dashboard)