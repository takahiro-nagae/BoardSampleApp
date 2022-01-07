import * as React from 'react';
import { useEffect, useState, Fragment } from 'react';
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
        axios.get<CategoryData[]>('http://localhost:3000/category/get').then((res) => {
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
                    <CategoryItem categoryData={category} updateCategories={updateCategories}
                         key={category.id} loggedInStatus={loggedInStatus} />
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