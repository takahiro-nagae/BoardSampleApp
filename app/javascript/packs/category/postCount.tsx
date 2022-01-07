import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const PostCount = (props: {id: number}) => {
    const [postCount, setPostCount] = useState();

    useEffect(() => {
        axios.get('http://localhost:3000/category/postCount?id=' + props.id).then((res) => {
            setPostCount(res.data);
        });
    }, []);

    return(
        <span className='text-danger'>投稿件数：{postCount}件</span>
    )
}