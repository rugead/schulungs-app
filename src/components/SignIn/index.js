import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
// 
// import { SignUpLink } from '../SignUp';
// import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';


import { Input, Button } from 'rbx';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <Input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
              className="input"
              autoComplete="on"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <Input
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
              autoComplete="on"
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <Button disabled={isInvalid}>Submit</Button>
          </div>
        </div>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInForm;

// export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
