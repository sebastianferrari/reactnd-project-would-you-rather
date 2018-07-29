import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestionAnswer } from '../actions/questions'
import './Question.css'
import {
  FormGroup,
  Radio,
  Image,
  Button,
  ProgressBar
} from 'react-bootstrap'

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

  componentWillMount() {
    const { questions, loggedUserId } = this.props
    const question = questions[this.props.id]
    
    if (question.optionOne.votes.includes(loggedUserId)
      || question.optionTwo.votes.includes(loggedUserId)) {
      this.setState(() => ({
        answered: true
      }))
    }
  }

  render() {
    const { users, questions } = this.props
    const question = questions[this.props.id]
    const user = question && users[question.author]

    let ownOption;
    if (question.optionOne.votes.includes(user.id)) {
      ownOption = 'optionOne'
    } else if (question.optionTwo.votes.includes(user.id)) {
      ownOption = 'optionTwo'
    }

    let totOp1 = question.optionOne.votes.length
    let totOp2 = question.optionTwo.votes.length
    let total = totOp1 + totOp2
    let op1percent = Math.round((totOp1 * 100) / total)
    let op2percent = Math.round((totOp2 * 100) / total)

    return (
      <div>
        {this.state.answered
          ? (
            <div className='questionResultContainer'>
              {question && user && (
                <div>
                  <h3>Asked by {user.name}</h3>
                  <Image
                    src={user.avatarURL}
                    alt={user.name}
                    circle
                    width={120} height={120}
                  />
                  <h4>Result</h4>
                  <div className='resultContainer'>
                    <div
                      className={ownOption === 'optionOne' ? 'hightlight' : ''}
                    >Would Your Rather {question.optionOne.text} <br />
                      <ProgressBar 
                        now={op1percent} 
                        label={`${op1percent}% (${totOp1} vote${totOp1 > 1 ? 's' : ''})`} 
                      />
                    </div>
                    <div
                      className={ownOption === 'optionTwo' ? 'hightlight' : ''}
                    >Would Your Rather {question.optionTwo.text} <br />
                      <ProgressBar 
                        now={op2percent} 
                        label={`${op2percent}% (${totOp2} vote${totOp2 > 1 ? 's' : ''})`} 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
          : (
            <div className='questionPendingContainer'>
              {question && user && (
                <div>
                  <h3>{user.name} asks:</h3>
                  <Image
                    alt={user.name}
                    src={user.avatarURL}
                    circle
                    height={120} width={120} 
                  />
                  <h4>Would You Rather ...</h4>
                  <form onSubmit={this.handleSubmit}>
                    <div className='radioFormGroup'>
                      <FormGroup>
                        <Radio 
                          name='radioGroup'
                          value='optionOne'
                          onChange={this.handleOptionChange}
                        >{question.optionOne.text}</Radio>
                        <Radio 
                          name='radioGroup'
                          value='optionTwo'
                          onChange={this.handleOptionChange}
                        >{question.optionTwo.text}</Radio>
                      </FormGroup>
                    </div>
                    <Button
                      type='submit'
                      bsStyle='primary'
                      disabled={this.state.selectedOption === ''
                        ? true
                        : false}
                    >Submit</Button>
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