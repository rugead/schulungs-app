import React from 'react';

import { withFirebase } from '../Firebase';
import { Navbar } from 'rbx';

const SignOutButton = ({ firebase }) => (
  <Navbar.Item onClick={firebase.doSignOut}>Sign Out</Navbar.Item>
);

export default withFirebase(SignOutButton);
