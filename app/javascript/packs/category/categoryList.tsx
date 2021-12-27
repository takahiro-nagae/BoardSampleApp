import * as React from 'react';
import { useEffect, useState, Fragment } from 'react';
import * as ReactDOM from 'react-dom';
import axios from 'axios';

import { CategoryData } from './categoryData';
import { CategoryItem } from './categoryItem';
import { CategoryForm } from './categoryForm';
import { Auth } from '../auth/auth';

/****************************************
 * カテゴリ一覧コンポーネント
 ****************************************/
export const CategoryList = () => {
    // カテゴリのstate
    const [categories, setCategories] = useState<CategoryData[]>([]);

    // タイトルを変更
    document.getElementById('title').innerHTML="トピックス一覧";

    useEffect(() => {
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
            <Auth />
            <div className='my-5 list-group'>
                {categories.map(category => (
                    <CategoryItem category_id={category.category_id} category_name={category.category_name} updateCategories={updateCategories} key={category.category_id} />
            ))}
            </div>
            <div className='my-5'>
                <CategoryForm updateCategories={updateCategories} />
            </div>
        </>
    );
};