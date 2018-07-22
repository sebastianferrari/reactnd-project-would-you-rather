import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  state = {
    answered: false
  }

  render() {
    const { users, questions, loggedUserId } = this.props
    const question = questions[this.props.id]
    const user = question && users[question.author]

    if (question.optionOne.votes.includes(loggedUserId)
      || question.optionTwo.votes.includes(loggedUserId)) {
      this.setState(() => {
        answered: true
      })
    }

    return (
      <div>
        {this.state.answered
          ? (
            <div>
              <h3>Question Result</h3>
              {question && user && (
                <div>
                  <div>Asked by {user.name}</div>
                  <img src={user.avatarURL} width={120} height={120} />
                  <h4>Result</h4>
                  <p>Would Your Rather {question.optionOne.text} <br />
                    <span>Quantity {question.optionOne.votes.length}</span>
                  </p>
                  <p>Would Your Rather {question.optionTwo.text} <br />
                    <span>Quantity {question.optionTwo.votes.length}</span>
                  </p>
                </div>
              )}
            </div>
          )
          : (
            <div>
              <h3>Question Pending</h3>
              {question && user && (
                <form>
                  <div>{user.name} asks:</div>
                  <img
                    alt={user.name}
                    src={user.avatarURL}
                    height={120}
                    width={120} />
                  <h4>Would You Rather ...</h4>
                  <div>
                    <input type='radio' name='option' value='1' />{question.optionOne.text} <br />
                    <input type='radio' name='option' value='2' />{question.optionTwo.text} <br />
                  </div>
                  <button type='submit'>Submit</button>
                </form>
              )}
            </div>
          )}
      </div>
    )
  }
}

function mapStateToProps({ users, questions, loggedUser }, props) {
  const { questionId } = props.match.params

  return {
    id: questionId,
    users,
    questions,
    loggedUserId: loggedUser.id
  }
}

export default connect(mapStateToProps)(Question)