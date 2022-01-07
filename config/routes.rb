Rails.application.routes.draw do

  resources :tests
  # ============================
  # 投稿
  # ============================
  # -- get --
  # 投稿のトップページ
  get 'post/index'
  # 投稿一覧を取得
  get 'post/get'
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
  get 'category/get'
  get 'category/postCount'
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
  # ============================
  # 認証
  # ============================
  # ログイン
  post '/login', to: 'sessions#login'
  # ログアウト
  delete '/logout', to: 'sessions#logout'
  # ログイン確認
  get '/logged_in', to: 'sessions#logged_in?'
end
