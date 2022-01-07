class PostController < ApplicationController
  def index
  end

  def get
    if params['category_id'] != nil then
      getCategoryPostData(params['category_id'])
    else
      render plain: [].to_json
    end
  end

  def regist

    # ============================
    # 投稿データの登録
    # ============================
    postData = Post.create(
      category_id: params['category_id'],
      hide_flag: '0',
      ip: params['ip'],
      name: params['name'] == '' ? '名無し' : params['name'],
      mail: params['mail'],
      subject: params['subject'],
      text: params['text'],
    )

    # ============================
    # データの返却
    # ============================
    if postData.save then
      # 更新データの返却
      getCategoryPostData(params['category_id'])
    else
      # modelのバリデーション結果を返却
      render json: {
          errors: postData.errors.keys.map {
            |key| [key, postData.errors.full_messages_for(key)]}.to_h,
          render: 'show.json.jbuilder'
        }, status: :unprocessable_entity
    end
  end

  def delete
    # ============================
    # データの返却（削除処理同時実施）
    # ============================
    if Post.find(params['id']).update(hide_flag: '1') then
      # 更新データの返却
      getCategoryPostData(params['category_id'])
    else
      # modelのバリデーション結果を返却
      render json: {
          errors: postData.errors.keys.map {
            |key| [key, postData.errors.full_messages_for(key)]}.to_h,
          render: 'show.json.jbuilder'
        }, status: :unprocessable_entity
    end
  end

  private
    def getCategoryPostData(category_id)

    # ============================
    # カテゴリの削除チェック
    # ============================
    category = Category.find(category_id)

    if category.deleted_flag == '1' then
      render json: {
        errors: "すでに削除されたカテゴリです。",
        render: 'show.json.jbuilder'
      }, status: :unprocessable_entity
      return
    end
      render plain:  Post.where(category_id: category_id).to_json
    end
end
