import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useState, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CategoryList } from './category/categoryList'
import { PostList } from './post/postList'
import { Auth } from './auth/auth';
import { UserData } from './auth/userData';

export const App = () => {
    // ログインステータス
    const [loggedInStatus, setLoggedInStatus] = useState(false);
    // ユーザ情報
    const [user, setUser] = useState<UserData>();
    return(
        <BrowserRouter>
        <Auth loggedInStatus={loggedInStatus} setLoggedInStatus={setLoggedInStatus} user={user} setUser={setUser} />
        <Switch>
            <Route path='/board/index' render={() => <CategoryList loggedInStatus={loggedInStatus} /> }/>
            <Route path='/post/index' render={() => <PostList loggedInStatus={loggedInStatus} loginUser={user} />} />
        </Switch>
        </BrowserRouter>
    );
};

ReactDOM.render(
    <App />
    , document.getElementById('app')
);
