import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import ClassroomPage from '../Classroom';
import { ReactComponent as Logo } from './logo.svg';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div className="main">
      <header>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item ssss" to={ROUTES.LANDING}>
              <Logo height="90" />
            </Link>
          </div>    
          <Navigation />
        </nav>  
      </header>

      <section className="section">
        <div className="container">
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.CLASSROOM} component={ClassroomPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
        </div>
      </section>
      <footer>Impressum Datenschutz</footer>
    </div>
  </Router>
);

export default withAuthentication(App);
