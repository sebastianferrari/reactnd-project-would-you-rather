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
import { computeValues } from '../utils/helpers'
import { Redirect } from 'react-router-dom'

class Question extends Component {
  state = {
    selectedOption: '',
    answered: false,
    redirectTo404: false
  }

  componentWillMount() {
    const { questions, loggedUserId } = this.props
    const question = questions[this.props.id]

    if (question === undefined) {
      this.setState({
        redirectTo404: true
      })
    } else if (question.optionOne.votes.includes(loggedUserId)
      || question.optionTwo.votes.includes(loggedUserId)) {
      this.setState(() => ({
        answered: true
      }))
    }
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
    if (this.state.redirectTo404) {
      return <Redirect to='/pageNotFound' />
    }

    const { users, questions } = this.props
    const question = questions[this.props.id]
    const user = question && users[question.author]

    const ownOption = (() => {
      if (question.optionOne.votes.includes(user.id)) {
        return 'optionOne'
      } else if (question.optionTwo.votes.includes(user.id)) {
        return 'optionTwo'
      }
    })();

    const { totOp1, totOp2, op1percent, op2percent } = computeValues(question) 

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