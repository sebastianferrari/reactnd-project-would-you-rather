import React, { Component } from 'react'
import { connect } from 'react-redux'
import { values } from '../utils/helpers'
import { handleSetLoggedUser } from '../actions/loggedUser'

class Login extends Component {
  state = {
    selectedUser: ''
  }

  handleSetUser = (e) => {
    e.preventDefault()

    const { dispatch } = this.props

    console.log('setLoggedUser: ', this.state.selectedUser)
    dispatch(handleSetLoggedUser(this.state.selectedUser))

    // todo: redirect to dashboard
  }

  handleChange = (e) => {
    let id = e.target.value;
    this.setState(() => ({
      selectedUser: id
    }))
  }

  render() {
    const { users } = this.props

    let arrUsers = Array.from(values(users));

    return (
      <div>
        <h3>Login into "Would You Rather" app</h3>
        <form onSubmit={this.handleSetUser}>
          <select value={this.state.selectedUser} onChange={this.handleChange}>
            <option value=''>Select an User</option>
            {arrUsers.length > 0 && arrUsers.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <input
            type="submit"
            value="Login"
            disabled={this.state.selectedUser === ''
              ? 'disabled'
              : ''}
          />
        </form>
      </div>
    )
  }
}

export default connect()(Login)