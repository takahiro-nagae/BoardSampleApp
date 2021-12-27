import * as React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { csrfToken } from 'rails-ujs';
import axios from 'axios'
import { PostData } from './postData'
import '../../../assets/stylesheets/post.scss'

/****************************************
 * 投稿一覧の各行データコンポーネント
 ****************************************/
export const PostItem = (props: PostData) => {

  const {post_id, category_id, hide_flag, ip, name, subject, text, post_date, clientIp, updatePosts, loggedInStatus} = props;

  // ================================
  // 投稿削除（非表示）イベント
  // ================================
  const deletePost = () => {

    let fd = new FormData();
    fd.append('category_id', category_id);
    fd.append('post_id', post_id.toString());

    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
    axios.post('http://localhost:3000/post/delete', fd)
    .then(res => {
        // postList更新
        updatePosts(res.data);
        // formを初期化
        document.forms['postForm'].reset();
    })
    .catch(error => console.log(error))
  }

  return(
    <>
      { (hide_flag == '0' || loggedInStatus) &&
        <li className='list-group-item'>
          <p className='text-muted'>
            <u>
              <span>{post_id} :{name}　{subject}　{post_date}</span>
              {
                (hide_flag == '1' && loggedInStatus) &&
                <span className='text-danger'>　削除済み</span>
              }
            </u>
          </p>
          <div className='d-flex justify-content-between align-items-start'>
            <p className='white-space'>{text}</p>
            { (ip == clientIp || loggedInStatus) &&
              <>
                <div className='text-right'>
                <button type='button' onClick={deletePost} className={'btn btn-danger' + ' delete' + post_id}>削除</button>
                </div>
              </>
            }
          </div>
        </li>
      }
    </>

  );
}