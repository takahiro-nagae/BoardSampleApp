import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import { PostData } from './postData'
import { PostItem } from './postItem'
import { PostTopBtn } from './postTopBtn';
import { PostForm } from './postForm';

/****************************************
 * 投稿一覧コンポーネント
 ****************************************/
export const PostList = (props) => {
    // ユーザ情報
    const {loggedInStatus, loginUser} = props;
    //投稿のstate
    const [posts, setPosts] = useState<PostData[]>([]);
    const [clientIp, setClientIp] = useState('');

    const query = queryString.parse(useLocation().search);

    // タイトルをカテゴリ名に変更
    document.getElementById('title').innerHTML=query['category_name'];

    // ================================
    // クライアントIP取得
    // ================================
    useEffect(() => {
        axios.get('https://geolocation-db.com/json/').then((res) => {
            setClientIp(res.data.IPv4);
        });
    }, []);

    // ================================
    // 投稿一覧を取得
    // ================================
    useEffect(() => {
        axios.get<PostData[]>('http://localhost:3000/post/getPostData?category_id=' + query['category_id']).then((res) => {
            setPosts(res.data);
        });
    }, []);

    // ================================
    // 子コンポーネントから投稿を再設定
    // ================================
    const updatePosts = (posts: PostData[]) => {
        let newPosts = [...posts];
        setPosts(newPosts);
    }

    return(
        <div>
            {/* 戻るボタン */}
            <PostTopBtn />
            {/* 投稿一覧 */}
            <div className='py-5'>
                <ul className='list-group'>
                    {posts.map(post => (
                        <PostItem post_id={post.post_id} category_id={post.category_id} ip={post.ip} hide_flag={post.hide_flag}
                            name={post.name} mail={post.mail} subject={post.subject} text={post.text} post_date={post.post_date}
                             clientIp={clientIp} updatePosts={updatePosts} loggedInStatus={loggedInStatus} key={post.post_id} />
                    ))}
                </ul>
            </div>
            {/* 投稿フォーム */}
            <PostForm category_id={query['category_id']} updatePosts={updatePosts} clientIp={clientIp} loginUser={loginUser} />
        </div>
    );
};