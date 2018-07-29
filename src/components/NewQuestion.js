import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'
import { 
  FormControl,
  Button
} from 'react-bootstrap'

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
    
    dispatch(handleAddQuestion(option1Text, option2Text))

    this.setState(() => ({
      option1Text: '',
      option2Text: '',
      toHome: true
    }))
  }

  render() {
    if (this.state.toHome) {
      return <Redirect to='/' />
    }

    let center = {
      textAlign: 'center',
      maxWidth: '500px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }

    return (
      <div style={center}>
        <h2>Create New Question</h2>
        <p>Complete the Question:</p>
        <h3>Would you rather ...</h3>
        <form onSubmit={this.handleSubmit}>
          <FormControl
            type='text'
            placeholder='Option 1'
            onChange={this.handleOption1Change}
          />
          ... OR ...
          <FormControl
            type='text'
            placeholder='Option 2'
            onChange={this.handleOption2Change}
          />
          <br />
          <Button 
            type='submit'
            bsStyle='primary'
            disabled={this.state.option1Text === '' || this.state.option2Text === ''}
          >Submit</Button>
        </form>
      </div>
    )
  }
}

export default connect()(NewQuestion)