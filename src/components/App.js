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
import './App.css'
import LeaderBoard from './LeaderBoard';

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
            {this.props.loggedUser === null || Object.keys(this.props.loggedUser).length === 0
              ? (
                <Login />
              )
              : (
                <Fragment>
                  <Nav />
                  <div className='innerContent'>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/question/:questionId' exact component={Question} />
                    <Route path='/add' exact component={NewQuestion} />
                    <Route path='/leaderboard' exact component={LeaderBoard} />
                  </div>
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
