import React from 'react';
import { notFoundStyles } from './NotFoundStyles';

const NotFound: React.FC = () => (
  <div style={notFoundStyles}>
    <h1>404 — Page Not Found</h1>
    <p>Sorry, we couldn’t find the page you’re looking for.</p>
  </div>
);

export default NotFound;
