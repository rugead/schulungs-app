import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { Button, Input, Field, Label, Control, Box} from 'rbx'

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <Box>
        <form onSubmit={this.onSubmit}>
          <Field>
            <Label> Passwort ändern für: {this.props.authUser.username}</Label>
            <Control>
              <Input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Neues Passwort"
                autoComplete="password-new"
              />
              <Input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Neues Passwort bestätigen"
                autoComplete="password-new"
              />
            </Control>
          </Field>
          <Button 
            disabled={isInvalid} 
            type="submit"
            color="primary"
          >
            Passwort ändern
          </Button>

          {error && <p>{error.message}</p>}
        </form>
      </Box>
    );
  }
}

export default withFirebase(PasswordChangeForm);
