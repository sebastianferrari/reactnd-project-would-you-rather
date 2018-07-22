import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleSetLoggedUser } from '../actions/loggedUser'

class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault()
    this.props.dispatch(handleSetLoggedUser(null))
    return <Redirect to='/' />
  }

  render() {
    const { loggedUser } = this.props

    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
          </NavLink>
          </li>
          <li>
            <NavLink to='/add' exact activeClassName='active'>
              New Question
          </NavLink>
          </li>
          <li>
            <NavLink to='leaderboard' exact activeClassName='active'>
              Leader Board
            </NavLink>
          </li>
          {loggedUser && (
            <li>
              <div>
                <span>Hello, {loggedUser.name}! </span>
                <img
                  alt={loggedUser.name}
                  src={loggedUser.avatarURL}
                  height={30} width={30} />
              </div>
            </li>
          )}
          {loggedUser && (
            <li>
              {/* <NavLink to='/' exact>
                Logout
              </NavLink> */}
              <a href='#' onClick={this.handleLogout}>Logout</a>
            </li>
          )}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({ loggedUser }) {
  return {
    loggedUser
  }
}

export default connect(mapStateToProps)(Nav)