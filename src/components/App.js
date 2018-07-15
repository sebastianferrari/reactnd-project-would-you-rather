import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Login from './Login'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    console.log('Users from App: ', this.props.users);

    return (
      <div>
        <LoadingBar />
        <div>Logged User: {this.props.loggedUser && this.props.loggedUser.name}</div>
        <Login />
      </div>
    );
  }
}

function mapStateToProps({ loggedUser, users }) {
  return {
    loggedUser,
    loading: loggedUser === null,
    users
  }
}

export default connect(mapStateToProps)(App);
