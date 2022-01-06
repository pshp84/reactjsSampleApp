import React, { useReducer } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import { AppContext } from "./AppContext";
import LoginPage from './modules/login/Login';
import SecondPage from './modules/secondPage/SecondPage';
import PrivateRoute from './PrivateRoute';

const initialState = { user: {} };

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { user:  JSON.parse(sessionStorage.getItem('authUser'))};
    case 'logout':
      return { user: sessionStorage.removeItem('authUser') };
    default:
      throw new Error();
  }
}

const App = () => {
  const [userData, setUserData] = useReducer(reducer, initialState);

  const appContext = {
    userData,
    setUserData,
  }
  return (

    <div style={{ height: "100%" }}>
      <Router>
        <Switch>
          <AppContext.Provider value={appContext}>
            <PrivateRoute path={"/:name"} component={SecondPage} />
            <Route exact path="/" component={LoginPage} />
            <Redirect to="/" />
          </AppContext.Provider>
        </Switch>
      </Router>
    </div>
  )

};

export default App;
