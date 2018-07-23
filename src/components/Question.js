import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestionAnswer } from '../actions/questions'
import { addAnswer } from '../actions/users'

class Question extends Component {
  state = {
    selectedOption: '',
    answered: false
  }

  handleOptionChange = (e) => {
    const selectedOption = e.target.value
    this.setState(() => ({
      selectedOption
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const answer = this.state.selectedOption
    const { dispatch, loggedUserId, id } = this.props

    dispatch(handleAddQuestionAnswer({
      authedUser: loggedUserId,
      qid: id,
      answer
    }))

    this.setState(() => ({
      answered: true
    }))
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
                <div>
                  <div>{user.name} asks:</div>
                  <img
                    alt={user.name}
                    src={user.avatarURL}
                    height={120}
                    width={120} />
                  <h4>Would You Rather ...</h4>
                  <form onSubmit={this.handleSubmit}>
                    <div>
                      <input 
                        type='radio' 
                        name='option' 
                        value='optionOne'
                        onChange={this.handleOptionChange}
                      />{question.optionOne.text} <br />
                      <input 
                        type='radio' 
                        name='option' 
                        value='optionTwo'
                        onChange={this.handleOptionChange}
                      />{question.optionTwo.text} <br />
                    </div>
                    <button 
                      type='submit'
                      disabled={this.state.selectedOption === ''
                        ? 'disabled'
                        : ''}
                    >Submit</button>
                  </form>
                </div>
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