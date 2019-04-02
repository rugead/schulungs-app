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
import LessonsPage from '../Lessons';
import DatenschutzPage from '../Datenschutz';
import ImpressumPage from '../Impressum';

import logo from './logo.jpg';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { Content, Container, Navbar, Button } from 'rbx';

// function Logo() {
//   // Import result is the URL of your image
//   return <img src={logo} alt="Logo" />;
// }

const App = () => (
  <Router>
    <div className="main">
      <header>
        <Container>
          <Navbar>
            <Navbar.Brand>
              <Navbar.Item as={Link} to={ROUTES.HOME}>
                <img
                  src={logo}
                  alt="Logo Bäckerei Münzel"
                />
              </Navbar.Item>
              <Navbar.Burger></Navbar.Burger>
            </Navbar.Brand>
            <Navigation />
          </Navbar>
        </Container>
      </header>
      <Content>
        <Container>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.CLASSROOM} component={ClassroomPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.LESSONS} component={LessonsPage} />
          <Route path={ROUTES.IMPRESSUM} component={ImpressumPage} />
          <Route path={ROUTES.DATENSCHUTZ} component={DatenschutzPage} />
        </Container>
      </Content>
      <Content>
        <Container>
          <footer>
            <Button as={Link} to={ROUTES.DATENSCHUTZ} >Datenschutz</Button>
            <Button as={Link} to={ROUTES.IMPRESSUM} >Impressum</Button>
          </footer>
          </Container>
      </Content>
    </div>
  </Router>
);

export default withAuthentication(App);
