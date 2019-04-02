import React from 'react';
import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom'
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

// import * as ROLES from '../../constants/roles';

import { Navbar } from 'rbx';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <Navbar.Menu>
    <Navbar.Segment align="start">
      <Navbar.Item as={Link} to={ROUTES.HOME}>Home</Navbar.Item>
      <Navbar.Item as={Link} to={ROUTES.CLASSROOM}>Schulungen
      </Navbar.Item>
    </Navbar.Segment>
    
    <Navbar.Segment align="end">
      <SignOutButton />
    </Navbar.Segment>
  </Navbar.Menu>

);

const NavigationNonAuth = () => (
  <Navbar.Segment align="end">
    <Navbar.Item color="primary" as={Link} to={ROUTES.SIGN_UP}>
      Sign up
    </Navbar.Item>
    <Navbar.Item color="light" as={Link} to={ROUTES.SIGN_IN}>
      Log In
    </Navbar.Item>
  </Navbar.Segment>
);

export default Navigation;
