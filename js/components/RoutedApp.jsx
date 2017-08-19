'use strict'

import React from 'react';
import GameList from './GameList';
import RequestList from './RequestList';

const RoutedApp = () => (
  <div>
    <RequestList />
    <GameList />
  </div>
);

export default RoutedApp;
