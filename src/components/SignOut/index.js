import React from 'react';
import { Link } from 'react-router-dom'

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <Link to={'/'} onClick={firebase.doSignOut} className="navbar-item">
    abmelden
  </Link>
);

export default withFirebase(SignOutButton);
