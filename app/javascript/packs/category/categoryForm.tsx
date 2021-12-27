import * as React from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { csrfToken } from 'rails-ujs';
import { CategoryData } from "./categoryData";

/****************************************
 * カテゴリ新規作成コンポーネント
 ****************************************/
 export const CategoryForm = (props) => {
    const {updateCategories} = props;

    // ================================
    // バリデーション設定
    // ================================
    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<CategoryData>({
        mode: "onChange",
        criteriaMode: "all",
        shouldFocusError: false,
      });

    // ================================
    // form送信イベント
    // ================================
    const onSubmit = () => {
        axios.defaults.headers.common['X-CSRF-Token'] = csrfToken();
        axios.post('http://localhost:3000/category/regist', new FormData(document.forms['categoryForm']))
        .then(res => {
            // カテゴリList更新
            updateCategories(res.data);
            // 初期化
            document.getElementById('error_message').innerHTML='';
            document.forms['categoryForm'].reset();
        })
        .catch(error => {
            // サーバサイドバリデーションをレンダリング
            document.getElementById('error_message').innerHTML=error.response.data.errors.text;
        });
    }

    return(
        <>
            <h2 className='bg-primary text-white p-1'>カテゴリ登録</h2>
            <div id="error_message" className='text-danger my-4'></div>
            <form onSubmit={handleSubmit(onSubmit)} id='categoryForm' className='mb-5'>
                <div className='form-group'>
                    <label htmlFor='category_name'>カテゴリ名</label>
                    <input type='text' className='form-control' id='category_name' name='category_name' {...register("category_name", { required: true, maxLength: 512 })} />
                    {errors.category_name?.types?.required && <span className='text-danger'>カテゴリ名は必須です</span>}
                    {errors.category_name?.types?.maxLength && <span className='text-danger'>カテゴリ名は512文字以内で入力してください</span>}
                </div>
                <button type='submit' className='btn btn-success'>登録</button>
            </form>
        </>
    );
};