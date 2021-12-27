import * as React from 'react';
import { useEffect, useState, Fragment } from 'react';
import * as ReactDOM from 'react-dom';
import * as Modal from 'react-modal';
import axios from 'axios';
import { UserData } from './userData';

/****************************************
 * 認証コンポーネント
 ****************************************/
export const Auth = (props) => {
    const {loggedInStatus, setLoggedInStatus, user, setUser} = props;
    // モーダル
    const [modalIsOpen,setIsOpen] = React.useState(false);
    // メール
    const [email, setEmail] = useState("");
    // パスワード
    const [password, setPassword] = useState("");



    // モーダルのスタイル
    const customStyles = {
        content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
        }
    };

    // モーダル表示
    const openModal = () => setIsOpen(true);
    // モーダル非表示
    const closeModal = () => setIsOpen(false);

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
            closeModal();
            setLoginInfo(res.data.user, true);
        })
        .catch(error => {
            closeModal();
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
            { !loggedInStatus && <button type='submit' className='btn btn-success' onClick={openModal}>ログイン</button>}
            { loggedInStatus &&
                    <>
                        <button type='button' className='btn btn-secondary' onClick={handleLogout}>ログアウト</button>
                    </>
            }
            <Modal isOpen={modalIsOpen} style={customStyles}>
                <form onSubmit={handleSubmit} id='regist' className='mb-5'>
                    <div className='form-group'>
                        <label htmlFor='email'>メールアドレス</label>
                        <input type='email' className='form-control' id='email' name='email' value={email} onChange={event => setEmail(event.target.value)} />
                        <label htmlFor='password'>パスワード</label>
                        <input type='password' className='form-control' id='password' name='password' value={password} onChange={event => setPassword(event.target.value)} />
                    </div>
                    <button className="mr-2 btn btn-secondry" onClick={closeModal}>キャンセル</button>
                    <button type='submit' className='btn btn-success'>ログイン</button>
                </form>
            </Modal>
        </>
    );
};