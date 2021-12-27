Rails.application.routes.draw do
  devise_for :accounts
  # ============================
  # 投稿
  # ============================
  # -- get --
  # 投稿のトップページ
  get 'post/index'
  # 投稿一覧を取得
  get 'post/getPostData'
  # -- post --
  # 新規投稿
  post 'post/regist'
  # 投稿非表示
  post 'post/delete'
  # ============================
  # カテゴリ
  # ============================
  # -- get --
  # カテゴリ一覧を取得
  get 'category/getCategories'
  # -- post --
  # カテゴリを登録
  post 'category/regist'
  # カテゴリを削除
  post 'category/delete'
  # カテゴリを編集
  post 'category/edit'
  # ============================
  # TOP
  # ============================
   # -- get --
   # トップページ
  get 'board/index'
end
