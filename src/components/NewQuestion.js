import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    option1Text: '',
    option2Text: '',
    toHome: false
  }

  handleOption1Change = (e) => {
    const option1Text = e.target.value

    this.setState(() => ({
      option1Text
    }))
  }

  handleOption2Change = (e) => {
    const option2Text = e.target.value

    this.setState(() => ({
      option2Text
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { option1Text, option2Text } = this.state
    const { dispatch } = this.props
    console.log('OPTIONS --> ', option1Text + ' - ' + option2Text)

    dispatch(handleAddQuestion(option1Text, option2Text))

    this.setState(() => ({
      option1Text: '',
      option1Text: '',
      toHome: true
    }))
  }

  render() {
    if (this.state.toHome) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <h1>Create New Question</h1>
        <p>Complete the Question:</p>
        <h2>Would you rather ...</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            onChange={this.handleOption1Change}
          />
          OR
          <input
            type='text'
            onChange={this.handleOption2Change}
          />
          <button 
            type='submit'
            disabled={this.state.option1Text === '' || this.state.option2Text === ''}
          >Submit</button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)