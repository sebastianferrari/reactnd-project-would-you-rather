import React, { Component } from 'react';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Dashboard from './Dashboard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div>
        <LoadingBar />
        <div>Logged User: {this.props.loggedUser && this.props.loggedUser.name}</div>
        {Object.keys(this.props.loggedUser).length === 0
          ? (
            <Login />
          )
          : (
            <Dashboard />
          )}        
      </div>
    );
  }
}

function mapStateToProps({ loggedUser }) {
  return {
    loggedUser,
    loading: loggedUser === null
  }
}

export default connect(mapStateToProps)(App);
