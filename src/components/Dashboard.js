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

function mapStateToProps({ questions, users, loggedUser }) {
  const userId = loggedUser.id;

  return {
    unansweredQuestionIds: Object.keys(questions)
      .filter(key => {
        if (!questions[key].optionOne.votes.includes(userId)
            && !questions[key].optionTwo.votes.includes(userId)) {
              return key
            }
      })
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    answeredQuestions: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    questions,
    users
  }
}

export default connect(mapStateToProps)(Dashboard)