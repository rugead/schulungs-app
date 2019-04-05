import React from 'react';

import { withFirebase } from '../Firebase';
import { Navbar } from 'rbx';

const SignOutButton = ({ firebase }) => (
  <Navbar.Item onClick={firebase.doSignOut}>Abmelden</Navbar.Item>
);

export default withFirebase(SignOutButton);
