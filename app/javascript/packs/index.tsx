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
    // 画面タイトル
    const [titile, setTitle] = useState('');

    /**
     * ユーザ情報を設定
     * @module setLoginInfo
     * @param {UserData} data - ユーザ情報
     * @param {boolean} state - ログインステータス
     */
    const setLoginInfo = (data: UserData, state: boolean) => {
        if(state) {
            setUser(data);
            setLoggedInStatus(state);
        } else {
            setLoggedInStatus(state);
            setUser(data);
        }
    }

    return(
        <>
            <header className="d-flex justify-content-between align-items-start">
                <h1 id="title" className="my-5 display-4 text-primary">{titile}</h1>
                <div id="auth" className="my-5 d-flex justify-content-between align-items-start">
                    <Auth loggedInStatus={loggedInStatus} user={user} setLoginInfo={() => setLoginInfo} />
                </div>
            </header>
            <BrowserRouter>
            <Switch>
                <Route path='/board/index' render={() => <CategoryList loggedInStatus={loggedInStatus} setTitle={setTitle} /> }/>
                <Route path='/post/index' render={() => <PostList loggedInStatus={loggedInStatus} loginUser={user} setTitle={setTitle} />} />
            </Switch>
            </BrowserRouter>
        </>
    );
};

ReactDOM.render(
    <App />
    , document.getElementById('app')
);
