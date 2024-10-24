/* eslint react/no-did-mount-set-state: 0 */
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Link,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import MoviesList from './movies/MoviesList';
import MovieDetail from './movies/MovieDetail';

const App = () => {
  const {notificationListState, setNotificationListState} = useState([]);

  // Needed for form components
  useEffect(() => () => setNotificationListState([]));

  return (
    <div>
      <h1> Header </h1>
      <Router setNotificationListState={setNotificationListState}>
        <header className="App-header">
          <Link to="/">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </header>
        <div>
          <Switch>
            <Route exact path="/" component={MoviesList} />
            <Route path="/:id" component={MovieDetail} />
          </Switch>
        </div>
      </Router>
      <NotificationList notificationListState={notificationListState} />
      <h1> Footer </h1>
    </div>
  )
};

export default App;
