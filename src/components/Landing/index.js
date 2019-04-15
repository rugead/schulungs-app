import React from 'react';
// import { Hero } from 'rbx';
import { SignUpLink } from '../SignUp';
import { SignInLink, SignInGoogle } from '../SignIn';

import { Title, Box } from 'rbx';

const Landing = () => (
  <div>
    <Title>
      Willkommen bei der Schulungs-App der Bäckerei Münzel
    </Title> 
    <Box>
      <SignInLink />
    </Box>
    <Box>
      <SignInGoogle />
    </Box>
    <Box>
      <SignUpLink />
    </Box>
  </div>
);

// const Landing = () => (
//   <Hero size="fullheight">
//   <div>
//     <h1>Landing</h1>
//   </div>
//   </Hero>
// );

export default Landing;
