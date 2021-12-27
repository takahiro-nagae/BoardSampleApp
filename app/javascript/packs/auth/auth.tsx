import * as React from 'react';
import { useEffect, useState, Fragment } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import { UserData } from './userData';

/****************************************
 * 認証コンポーネント
 ****************************************/
export const Auth = (props) => {
    // ログインステータス
    const [loggedInStatus, setLoggedInStatus] = useState(false);
    // メール
    const [email, setEmail] = useState("");
    // パスワード
    const [password, setPassword] = useState("");
    // ユーザ情報
    const [user, setUser] = useState<UserData>();

    // ================================
    // ログインボタン押下
    // ================================
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login',
            {
                user: {
                    email: email,
                    password: password,
                }
            },
            { withCredentials: true }
        ).then(res => {
            setLoginInfo(res.data.user, true);
        })
        .catch(error => {
            // サーバサイドバリデーションをレンダリング
            console.log(error.response);
        });
    }

    // ================================
    // ログアウトボタン押下
    // ================================
    const handleLogout = () => {
        axios.delete("http://localhost:3000/logout", { withCredentials: true })
        .then(res => {
            setLoggedInStatus(false);
            setUser(undefined);
            formReset();
        }).catch(error => {
            console.log("ログアウトエラー", error);
        })
    }


    useEffect(() => {
        checkLoginStatus();
    }, []);

    // ================================
    // ログイン状態を確認
    // ================================
    const checkLoginStatus = () => {
        axios.get("http://localhost:3000/logged_in", { withCredentials: true })
          .then(res => {
            if(res.data.user != undefined) {
                setLoginInfo(res.data.user, true);
            }
        }).catch(error => {
          console.log("ログインエラー", error);
        })
    }

    /**
     * ユーザ情報を設定
     * @module setLoginInfo
     * @param {UserData} data - ユーザ情報
     * @param {boolean} state - ログインステータス
     */
    const setLoginInfo = (data: UserData, state: boolean) => {
        setUser(data);
        setLoggedInStatus(state);
        formReset();
    }

    const formReset = () => document.forms['regist'].reset();

    return(
        <>
        <div>
            { loggedInStatus &&
                <>
                    <span>{user.name}</span>
                    <span>{user.mail}</span>
                </>
            }
        </div>
        <form onSubmit={handleSubmit} id='regist' className='mb-5'>
            <div className='form-group'>
                <label htmlFor='email'>メールアドレス</label>
                <input type='email' className='form-control' id='email' name='email' value={email} onChange={event => setEmail(event.target.value)} />
                <label htmlFor='password'>パスワード</label>
                <input type='password' className='form-control' id='password' name='password' value={password} onChange={event => setPassword(event.target.value)} />
            </div>
            <button type='submit' className='btn btn-success'>ログイン</button>
        </form>
        { loggedInStatus &&
                <>
                    <button type='button' className='btn btn-secondry' onClick={handleLogout}>ログアウト</button>
                </>
            }
        </>
    );
};