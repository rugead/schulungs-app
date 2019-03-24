import React from 'react';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

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

const NavigationAuth = ({ authUser }) => (
  <ul className="navigation">
    <li>
      <NavLink activeClassName="active" to={ROUTES.CLASSROOM}>Klassenzimmer</NavLink>
    </li>
    <li>
      <NavLink exact to={ROUTES.LANDING} activeClassName="active">News</NavLink>
    </li>
    <li>
      <NavLink to={ROUTES.HOME } activeClassName="active">Home</NavLink>
    </li>
    <li>
      <NavLink to={ROUTES.ACCOUNT} activeClassName="active">Account</NavLink>
    </li>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <li>
        <NavLink to={ROUTES.ADMIN} activeClassName="active">Admin</NavLink>
      </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul className="navigation">
    <li>
      <NavLink exact to={ROUTES.LANDING} activeClassName="active">Landing</NavLink>
    </li>
    <li>
      <NavLink to={ROUTES.SIGN_IN} activeClassName="active">Sign In</NavLink>
    </li>
  </ul>
);

export default Navigation;
