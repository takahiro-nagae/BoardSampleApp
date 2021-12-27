import * as React from 'react';
import { useHistory } from 'react-router-dom';

/****************************************
 * 投稿一覧画面上部のボタンコンポーネント
 ****************************************/
export const PostTopBtn = () => {
    const history = useHistory();

    // ================================
    // 戻るイベント
    // ================================
    const back = () => {
      history.push('/board/index');
    };

    return (
      <button type='button' className='btn btn-secondary' onClick={back}>
        戻る
      </button>
    );
};