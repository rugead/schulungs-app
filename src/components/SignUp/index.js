import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';


import { Input, Label, Control, Help, Field, Button, Title } from 'rbx';

const SignUpPage = () => (
  <div>
    <Title subtitle>Erstellen Sie hier persönliches Konto für  Schulungs-App der  Bäckerei Münzel</Title>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
  personalnummer: '',
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin, personalnummer } = this.state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set(
          {
            username,
            email,
            roles,
            personalnummer
          },
          { merge: true },
        );
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      // isAdmin,
      // personalnummer,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        
        <Field>
          <Label>Name</Label>
          <Control>
            <Input
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"
              placeholder="Name"
              autoComplete="on"
            />
          </Control>
          <Help>Geben Sie hier bitte Ihren Vor- und Nachname ein.</Help>
        </Field>

        <Field>
          <Label>Email Adresse</Label>
          <Control>
            <Input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Adresse"
              autoComplete="on"
            />
          </Control>
          <Help>Geben Sie hier Ihre Email Adresse ein.</Help>
        </Field>

        <Field>
          <Label>Passwort</Label>
          <Control>

            <Input
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="Passwort"
              autoComplete="on"
            />
          </Control>
          <Help>Bitte geben Sie hier Ihr Passwort ein.</Help>
        </Field>


        <Field>
          <Label>Passwortbestätigung</Label>
          <Control>
            <Input
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Passwortbestätigung"
              autoComplete="on"
            />
          </Control>
          <Help>Bitte geben Sie das Passwort erneut ein.</Help>
        </Field>
        
        {/* <Field>
          <Label>Label</Label>
          <Control>
            <Input
              name="isAdmin"
              type="checkbox"
              checked={isAdmin}
              onChange={this.onChangeCheckbox}
              autoComplete="on"
            />
          </Control>
          <Help>This is a help text</Help>
        </Field> */}

        <Button disabled={isInvalid} type="submit">
          Registrieren
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Noch nicht registriert? Noch kein Konto? <Link to={ROUTES.SIGN_UP}>Jetzt registrieren</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
