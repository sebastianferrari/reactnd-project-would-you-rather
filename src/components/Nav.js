import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {
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
          <li>
            {loggedUser && (
              <div>
                <span>Hello, {loggedUser.name}! </span> 
                <img src={loggedUser.avatarURL} height={30} width={30} /> 
              </div>            
            )}
          </li>
          {loggedUser && (
            <li>
              <NavLink to='/' exact>
                Logout
              </NavLink>
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