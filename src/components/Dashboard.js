import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPreview from './QuestionPreview'
import { 
  Tabs,
  Tab
} from 'react-bootstrap'
import './Dashboard.css'

class Dashboard extends Component {
  state = {
    key: 1
  }

  handleSelect = (key) => {
    // alert(`selected ${key}`);
    this.setState({ key });
  }

  render() {
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab"
      >
        <Tab eventKey={1} title='Unanswered Questions'>
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
        </Tab>

        <Tab eventKey={2} title='Answered Questions'>
          <br />
          {this.props.answeredQuestionsIds.map((id) => {
            const question = this.props.questions[id]
            return (
              <QuestionPreview 
                key={id} 
                question={question} 
                userAvatar={this.props.users[question.author].avatarURL}
                userFullName={this.props.users[question.author].name}
              />
          )})}
        </Tab>
      </Tabs>
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