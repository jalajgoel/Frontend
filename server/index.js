/* eslint-disable no-console */

import express from 'express';
import compression from 'compression';
import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';
import reactApplication from './middleware/reactApplication';
import security from './middleware/security';
import clientBundle from './middleware/clientBundle';
import serviceWorker from './middleware/serviceWorker';
import offlinePage from './middleware/offlinePage';
import errorHandlers from './middleware/errorHandlers';
import config from '../config';
import graph from 'fbgraph';
// Create our express based server.
const app = express();

// Don't expose any software information to potential hackers.
app.disable('x-powered-by');

// Security middlewares.
app.use(...security);

// Gzip compress the responses.
app.use(compression());

// Register our service worker generated by our webpack config.
// We do not want the service worker registered for development builds, and
// additionally only want it registered if the config allows.
if (process.env.BUILD_FLAG_IS_DEV === 'false' && config('serviceWorker.enabled')) {
  app.get(`/${config('serviceWorker.fileName')}`, serviceWorker);
  app.get(
    `${config('bundles.client.webPath')}${config('serviceWorker.offlinePageFileName')}`,
    offlinePage,
  );
}

// Configure serving of our client bundle.
app.use(config('bundles.client.webPath'), clientBundle);

// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use(express.static(pathResolve(appRootDir.get(), config('publicAssetsPath'))));

app.get('/auth/facebook', (req, res) => {
  console.log('req', req);
  if (!req.query.code) {
    console.log('Performing oauth for some user right now.');

    const authUrl = graph.getOauthUrl({
      client_id: '547888505552566',
      redirect_uri: 'http://192.168.0.103:1337/auth/facebook',
      scope: 'public_profile',
    });

    if (!req.query.error) {
      // checks whether a user denied the app facebook login/permissions
      res.redirect(authUrl);
    } else {
      // req.query.error == 'access_denied'
      res.send('access denied');
    }
  } else {
    const code = req.query.code;
    console.log('Oauth successful, the code (whatever it is) is: ', code);
    // code is set
    // we'll send that and get the access token
    graph.authorize(
      {
        client_id: '547888505552566',
        redirect_uri: 'http://192.168.0.103:1337/auth/facebook',
        client_secret: 'dc95c454dc320e907ab24559777f3954',
        code,
      },
      (err, facebookRes) => {
        console.log('res', facebookRes);
        res.json(facebookRes);
      },
    );
  }
});

// The React application middleware.
app.get('*', reactApplication);

// Error Handler middlewares.
app.use(...errorHandlers);

// Create an http listener for our express app.
const listener = app.listen(config('port'), () =>
  console.log(`Server listening on port ${config('port')}`),
);

// We export the listener as it will be handy for our development hot reloader,
// or for exposing a general extension layer for application customisations.
export default listener;
