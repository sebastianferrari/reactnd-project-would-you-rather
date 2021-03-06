import React, { Component } from 'react'
import { connect } from 'react-redux'
import { values } from '../utils/helpers'
import { handleSetLoggedUser } from '../actions/loggedUser'
import './Login.css'
import { Button } from 'react-bootstrap'

class Login extends Component {  
  state = {
    selectedUser: ''
  }

  handleSetUser = (e) => {
    e.preventDefault()
    const { dispatch, users } = this.props

    let arrUsers = Array.from(values(users))
    let user = arrUsers.filter((u) => 
      u.id === this.state.selectedUser)[0]

    dispatch(handleSetLoggedUser(user))
  }

  handleChange = (e) => {
    let userId = e.target.value;
    this.setState(() => ({
      selectedUser: userId
    }))
  }

  render() {
    const { users } = this.props
    let arrUsers = Array.from(values(users));

    return (
      <div className='login-container'>
        <h3>Would You Rather...</h3>
        <img
          alt='Would You Rather'
          src='../../icon-reactjs.svg'
          height={100} width={100}
        />
        <form onSubmit={this.handleSetUser}>
          <select 
            value={this.state.selectedUser} 
            onChange={this.handleChange}
            className='form-control'
          >
            <option value=''>Select an User</option>
            {arrUsers.length > 0 && arrUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <br />
          <Button 
            bsStyle="primary"
            bsSize='large'
            type="submit"
            disabled={this.state.selectedUser === ''
              ? true
              : false}
          >Login</Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Login)