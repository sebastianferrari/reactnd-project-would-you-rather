import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPreview from './QuestionPreview'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>Dashboard</h3>
        <br />
        {this.props.unansweredQuestionsIds.map((id) => {
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

function mapStateToProps({ questions, users, loggedUser }) {
  const userId = loggedUser.id;

  return {
    unansweredQuestionsIds: Object.keys(questions)
      .filter(key =>
        !questions[key].optionOne.votes.includes(userId)
        && !questions[key].optionTwo.votes.includes(userId))
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestionsIds: Object.keys(questions)
      .filter(key =>
        questions[key].optionOne.votes.includes(userId)
        || questions[key].optionTwo.votes.includes(userId)
      )
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    questions,
    users
  }
}

export default connect(mapStateToProps)(Dashboard)