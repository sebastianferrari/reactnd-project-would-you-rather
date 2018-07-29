import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleSetLoggedUser } from '../actions/loggedUser'
import {
  Navbar,
  Image
} from 'react-bootstrap'

class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault()
    this.props.dispatch(handleSetLoggedUser(null))
    return <Redirect to='/' />
  }

  render() {
    const { loggedUser } = this.props

    let logoutStyle = {
      marginRight: '30px'
    }

    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            Would You Rather...
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </Navbar.Text>
          <Navbar.Text>
            <NavLink to='/add' exact activeClassName='active'>
              New Question
            </NavLink>
          </Navbar.Text>
          <Navbar.Text>
            <NavLink to='/leaderboard' exact activeClassName='active'>
              Leader Board
            </NavLink>
          </Navbar.Text>

          {loggedUser && (
            <Navbar.Text pullRight>
              <a href='/' style={logoutStyle} onClick={this.handleLogout}>Logout</a>
            </Navbar.Text>
          )}

          {loggedUser && (
            <Navbar.Text pullRight>
              Hello, {loggedUser.name}! &nbsp;
              <Image
                src={loggedUser.avatarURL}
                circle
                height={20} width={20}
              /> &nbsp;
            </Navbar.Text>
          )}

        </Navbar.Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps({ loggedUser }) {
  return {
    loggedUser
  }
}

export default connect(mapStateToProps)(Nav)