import React from 'react';
// import { Link } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom'
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
  <div id="navbarBasicExample" className="navbar-menu is-active">
    <div className="navbar-start">
      <div className="navbar-item has-dropdown is-hoverable">
          <Link className="navbar-link" to='#'>Schulungen</Link>
          <div className="navbar-dropdown is-hoverable">
            <Link className="navbar-item is-hoverable" to={ROUTES.CLASSROOM}>
              Hygiene-Schulung
            </Link>
            <Link className="navbar-item is-hoverable" to={ROUTES.HOME}>
              Home
            </Link>
            <Link className="navbar-item is-hoverable" to={ROUTES.ACCOUNT}>
              Benutzerkonto
            </Link>
          </div>
      </div>
    </div>

    <div className="navbar-end">
      <div className="navbar-item has-dropdown is-hoverable">
          <Link className="navbar-link" to='#'>Benutzer Konto</Link>
          <div className="navbar-dropdown">
            {authUser.roles.includes(ROLES.ADMIN) && (<NavLink to={ROUTES.ADMIN} activeClassName="active">Admin</NavLink>)}
            <Link className="navbar-item" to={ROUTES.HOME}>
              Home
            </Link>
            <Link className="navbar-item" to={ROUTES.ACCOUNT}>
              Passwort ändern
            </Link>
          </div>
      </div>    
      <SignOutButton />
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <div id="navbarBasicExample" className="navbar-menu is-active">
    <div className="navbar-end">
      <div className="navbar-item">
          <NavLink className="navbar-item" activeClassName="active" to={ROUTES.SIGN_UP}>
            registrieren
          </NavLink>
          <NavLink className="navbar-item"  activeClassName="active" to={ROUTES.SIGN_IN}>
            anmelden
          </NavLink>
      </div>
    </div>
  </div>
);

export default Navigation;
