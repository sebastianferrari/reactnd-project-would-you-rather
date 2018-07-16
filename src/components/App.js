import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import Question from './Question'
import NewQuestion from './NewQuestion'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {/* <div>Logged User: {this.props.loggedUser && this.props.loggedUser.name}</div> */}
            {Object.keys(this.props.loggedUser).length === 0
              ? (
                <Login />
              )
              : (
                <Fragment>
                  <Nav />
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/question/:questionId' exact component={Question} />
                  <Route path='/add' exact component={NewQuestion} />
                </Fragment>
              )}
          </div>
        </Fragment>
      </Router>
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
