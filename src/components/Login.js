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
    const { dispatch, users } = this.props

    let arrUsers = Array.from(values(users))
    let user = arrUsers.filter((u) => 
      u.id === this.state.selectedUser)[0]

    dispatch(handleSetLoggedUser(user))

    // todo: redirect to dashboard
  }

  handleChange = (e) => {
    let userId = e.target.value;
    this.setState(() => ({
      selectedUser: userId
    }))
  }

  render() {
    const { users } = this.props
    console.log('Users ==> ', this.props.users)
    let arrUsers = Array.from(values(users));

    console.log('SelectedUser -> ', this.state.selectedUser)

    return (
      <div>
        <h3>Login into "Would You Rather" app</h3>
        <form onSubmit={this.handleSetUser}>
          <select value={this.state.selectedUser} onChange={this.handleChange}>
            <option value={''}>Select an User</option>
            {arrUsers.length > 0 && arrUsers.map((user) => (
              <option key={user.id} value={user.id}>
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

function mapStateToProps({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Login)