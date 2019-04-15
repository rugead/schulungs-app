import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

import { Button, Content, Section, Title } from 'rbx';

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }))
        .catch(error => {
          this.setState({ error });
        });
    };

    render() {
      const { error} = this.state
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <Content size="large">
                {this.state.isSent ? (
                  <p>                                                
Bitte prüfen Sie Ihren Posteingang. Schauen gegebenenfalls auch im Spam- und Junk-Ordner nach.
Bitte klicken Sie auf den Link in der Email und bestätigen Sie damit Ihre Registrierung.
                    Laden Sie danach bitte diese Seite einmal neu.
                  </p>
                ) : (
                  <>

                  <p>
                    Bitte verifizieren Sie Ihre Emailadresse.
                  </p>
                  <p>
                    Prüfen Sie Ihren Posteingang und gegebenenfalls den Spam-Ordner bezüglich der Bestätigungs-Email.
                  </p>
                  <p>
                    Bitte klicken Sie auf denn Link in der Email und bestätigen Sie Ihre Registrierung.
                  </p>
                  <p>
                    Danach bitte diese Seite einmal neu Laden.
                  </p>
                  <p>
                    Keine Email gefunden? Dann können Sie sich jetzt die Bestätigungs-Email erneut zu senden.
                  </p>
                  </>
                )}

                <Button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                  color="primary"
                >
                  Bestätigungs-Email erneut zusenden
                </Button>
                {
                  error && 
                    <Section backgroundColor="danger">
                      <Title textColor="light" as="h2" subtitle>{error.message}</Title>
                    </Section>
                }

              </Content>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
