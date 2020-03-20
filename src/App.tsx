import * as React from 'react';
import { FC } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import FetchUsers from './components/FetchUsers';

import './custom.css';
import UserForm from './components/UserForm';

const App: FC = () => {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/counter" component={Counter} />
            <Route path="/fetch-data" component={FetchData} />
            <Route path="/fetch-users" component={FetchUsers} />
            <Route path="/user-form" component={UserForm} />
        </Layout>
    );
};
export default App;
