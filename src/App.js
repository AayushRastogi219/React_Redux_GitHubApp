import React, { Component } from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import MainForm from './components/MainForm'
import store from './store/indexStore'
import gitDashBoard from './components/gitDashBoard';
import SelectedRepoData from './components/SelectedRepoData';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Provider store={store}>
            <div>
              <Route exact path='/' component={MainForm} />
              <Route exact path='/gitDashBoard' component={gitDashBoard} />
              <Route exact path='/SelectedRepoData' component={SelectedRepoData} />
            </div>
          </Provider>

        </div>
      </Router>
    );
  }
}

export default App;
