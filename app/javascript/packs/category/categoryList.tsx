import * as React from 'react';
import { useEffect, useState, Fragment } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';

import { CategoryData } from './categoryData';
import { CategoryItem } from './categoryItem';
import { CategoryForm } from './categoryForm';


/****************************************
 * カテゴリ一覧コンポーネント
 ****************************************/
export const CategoryList = (props) => {
    // ユーザ情報
    const {loggedInStatus, setTitle} = props;
    // カテゴリのstate
    const [categories, setCategories] = useState<CategoryData[]>([]);

    useEffect(() => {
        setTitle('トピックス一覧');
        axios.get<CategoryData[]>('http://localhost:3000/category/getCategories').then((res) => {
            setCategories(res.data);
        });
    }, []);

    // ================================
    // 子コンポーネントからカテゴリを再設定
    // ================================
    const updateCategories = (categories: CategoryData[]) => {
        let newCategories = [...categories];
        setCategories(newCategories);
    }

    return(
        <>
            <div className='my-5 list-group'>
                {categories.map(category => (
                    <CategoryItem category_id={category.category_id} category_name={category.category_name} updateCategories={updateCategories} key={category.category_id} loggedInStatus={loggedInStatus} />
            ))}
            </div>
            { loggedInStatus &&
                <div className='my-5'>
                    <CategoryForm updateCategories={updateCategories} />
                </div>
            }
        </>
    );
};