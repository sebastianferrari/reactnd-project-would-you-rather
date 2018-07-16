import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  state = {
    answered: true
  }

  render() {
    const { users, questions, loggedUserId } = this.props
    const question = questions[this.props.id]
    const user = question && users[question.author]
    const optionOneVotes = question && question.optionOne.votes
    const optionTwoVotes = question && question.optionTwo.votes
    console.log('QUESTION ==> ', question)
    console.log('VOTES    ==> ', optionOneVotes)

    // todo: if logged users is included in any
    //       of the voted options this questions
    //       is answered.
    if (
        (optionOneVotes
          && optionOneVotes.length > 0 
          && optionOneVotes.includes(loggedUserId))
        || 
        (optionTwoVotes
          && optionTwoVotes.length > 0
          && optionTwoVotes.includes(loggedUserId))
     ) {
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
                  <img src={user.avatarURL} height={160} width={160} />
                  <h4>Would You Rather ...</h4>
                  <div>
                    <input type='radio' name='option' value='1' />{question.optionOne.text} <br/>
                    <input type='radio' name='option' value='2' />{question.optionTwo.text} <br/>
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

function mapStateToProps({ users, questions, loggedUser }) {
  return {
    users,
    questions,
    loggedUserId: loggedUser.id
  }
}

export default connect(mapStateToProps)(Question)