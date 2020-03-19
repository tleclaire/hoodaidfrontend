import * as React from 'react';
import { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import FetchUsers from './components/FetchUsers';

import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  public render(): React.ReactElement {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/fetch-data" component={FetchData} />
        <Route path="/fetch-users" component={FetchUsers} />
      </Layout>
    );
  }
}
