import { handleAuth } from '@auth0/nextjs-auth0';

export default handleAuth();


/***
 require('dotenv').config({ path: '../../../.env.local' });
// pages/api/auth/[auth0].js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
const audience = process.env.AUTH0_AUDIENCE;

export default handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: audience, // or AUTH0_AUDIENCE
      // Add the `offline_access` scope to also get a Refresh Token
      scope: 'openid profile' // or AUTH0_SCOPE
    }
  })
});
 ***/