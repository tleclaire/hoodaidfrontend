import * as React from 'react';
import { FC } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import FetchUsers from './components/FetchUsers';

import './custom.css';
import DiaryForm from './components/Diary';
import { NotImplemented } from './components/notimplemented';
import FetchDiary from './components/FetchDiary';
import UserForm from './components/UserForm';

const App: FC = () => {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={UserForm} />
            <Route path="/login" component={NotImplemented} />
            <Route path="/diary" component={FetchDiary} />
            <Route path="/diary-form" component={DiaryForm} />
            <Route path="/fetch-users" component={FetchUsers} />
        </Layout>
    );
};
export default App;
