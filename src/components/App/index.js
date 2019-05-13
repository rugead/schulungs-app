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
import AdminLessons from '../Lessons/AdminLessons';
import ClassroomPage from '../Classroom';
import LessonsPage from '../Lessons';
import DatenschutzPage from '../Datenschutz';
import ImpressumPage from '../Impressum';
import logo from './logo.jpg';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { Hero, Container, Navbar, Tab } from 'rbx';

const App = () => (
  <Router>
    <Hero size="fullheight">
      <header>
        <Container>
          <Navbar>
            <Navbar.Brand>
              <Navbar.Item as={Link} to={ROUTES.LANDING}>
                <img
                  src={logo}
                  alt="Logo Bäckerei Münzel"
                />
              </Navbar.Item>
              <Navbar.Burger />
            </Navbar.Brand>
            <Navigation />
          </Navbar>
        </Container>
      </header>
        <Container>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.CLASSROOM} component={ClassroomPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminLessons} />
          <Route path={ROUTES.LESSONS} component={LessonsPage} />
          <Route path={ROUTES.IMPRESSUM} component={ImpressumPage} />
          <Route path={ROUTES.DATENSCHUTZ} component={DatenschutzPage} />
        </Container>
      <Hero.Foot >
          <Container>
          <Tab.Group as="nav" type="boxed" fullwidth size="small" kind="toggle">
              <Tab as={Link} to={ROUTES.DATENSCHUTZ} >Datenschutz</Tab>
              <Tab as={Link} to={ROUTES.IMPRESSUM} >Impressum</Tab>
              <Tab >&copy; 2019 - Bäckerei Münzel KG</Tab>
    
            </Tab.Group>
            </Container>
      </Hero.Foot>
    </Hero>
  </Router>
);

export default withAuthentication(App);
