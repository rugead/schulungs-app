import React from 'react';
import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom'
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

// import * as ROLES from '../../constants/roles';

import { Navbar, Content } from 'rbx';

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
  <Navbar.Menu>
    <Navbar.Segment align="end">
      <Navbar.Item dropdown>
        <Navbar.Link>
          <Content size="small">
            { authUser.username || authUser.email} || Konto & Schulungen
          </Content>
        </Navbar.Link>
        <Navbar.Dropdown>
          <Navbar.Item as={Link} to={ROUTES.HOME}>Übersicht</Navbar.Item>
          <Navbar.Item as={Link} to={ROUTES.CLASSROOM}>Hygiene-Schulungen</Navbar.Item>
          <Navbar.Divider></Navbar.Divider>
          <Navbar.Item as={Link} to={ROUTES.ACCOUNT}>Konto</Navbar.Item>
          <Navbar.Divider></Navbar.Divider>
          <SignOutButton />
        </Navbar.Dropdown>
      </Navbar.Item>
    </Navbar.Segment>
  </Navbar.Menu>

);


// const NavigationAuth = ({ authUser }) => (
//   <Navbar.Menu>
//     <Navbar.Segment align="end">
//       <Navbar.Item dropdown>
//         <Navbar.Link>
//           <Content size="small">
//             { authUser.username || authUser.email} || Konto & Schulungen
//           </Content>
//         </Navbar.Link>
//         <Navbar.Dropdown>
//           <Navbar.Item as={Link} to={ROUTES.HOME}>Übersicht</Navbar.Item>
//           <Navbar.Item as={Link} to={ROUTES.CLASSROOM}>Hygiene-Schulungen</Navbar.Item>
//           <Navbar.Divider></Navbar.Divider>
//           <Navbar.Item as={Link} to={ROUTES.ACCOUNT}>Konto</Navbar.Item>
//           <Navbar.Divider></Navbar.Divider>
//           <SignOutButton />
//         </Navbar.Dropdown>
//       </Navbar.Item>
//     </Navbar.Segment>
//   </Navbar.Menu>

// );

const NavigationNonAuth = () => (
  <Navbar.Menu>
  <Navbar.Segment align="end">
    <Navbar.Item as={Link} to={ROUTES.SIGN_UP}>
      Registrieren
    </Navbar.Item>
    <Navbar.Item as={Link} to={ROUTES.SIGN_IN}>
      Anmelden
    </Navbar.Item>
  </Navbar.Segment>
  </Navbar.Menu>
);

export default Navigation;
