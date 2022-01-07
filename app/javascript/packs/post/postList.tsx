import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useEffect, useState, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import { PostData } from './postData'
import { PostItem } from './postItem'
import { PostTopBtn } from './postTopBtn';
import { PostForm } from './postForm';
import { Error } from '../error/error';

/****************************************
 * 投稿一覧コンポーネント
 ****************************************/
export const PostList = (props) => {
    // props
    const {loggedInStatus, loginUser, setTitle} = props;
    //投稿のstate
    const [posts, setPosts] = useState<PostData[]>([]);
    const [clientIp, setClientIp] = useState('');

    const query = queryString.parse(useLocation().search);

    useEffect(() => {
        // タイトルをカテゴリ名に変更
        setTitle(query['category_name']);
        // クライアントIP取得
        axios.get('https://geolocation-db.com/json/').then((res) => {
            setClientIp(res.data.IPv4);
        });
        // 投稿一覧を取得
        getPostList();
    }, []);

    // ログイン状態が変化したら投稿一覧を再取得
    useEffect(() => {
        getPostList();
    }, [loggedInStatus]);

    const getPostList = () => {
        // 投稿一覧を取得
        axios.get<PostData[]>('http://localhost:3000/post/get?category_id=' + query['category_id'])
        .then((res) => {
            setPosts(res.data);
        })
        .catch(error => {
            if(error.response.status == 422) {
                ReactDOM.render(
                    <Error msg={error.response.data.errors} />
                    , document.getElementById('postContent')
                );
            }
        })
    }


    // ================================
    // 子コンポーネントから投稿を再設定
    // ================================
    const updatePosts = (posts: PostData[]) => {
        let newPosts = [...posts];
        setPosts(newPosts);
    }
    return(
        <>
            {/* 戻るボタン */}
            <PostTopBtn />
            <div id='postContent'>
                {/* 投稿一覧 */}
                <div className='py-5'>
                    <ul className='list-group'>
                        {posts.map(post => (
                            <PostItem postData={post} clientIp={clientIp} updatePosts={updatePosts} key={post.id} />
                        ))}
                    </ul>
                </div>
                {/* 投稿フォーム */}
                <PostForm category_id={query['category_id']} updatePosts={updatePosts}
                    clientIp={clientIp} loginUser={loginUser} />
            </div>
        </>
    );
};