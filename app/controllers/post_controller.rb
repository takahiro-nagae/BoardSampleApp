class PostController < ApplicationController
  def index
  end

  def getPostData
    if params['category_id'] != nil then
      getCategoryPostData(params['category_id'], '0')
    else
      render plain: [].to_json
    end
  end

  def regist
    # ============================
    # 現在の投稿番号の最大値
    # ============================
    maxPostNo = Post.where(category_id: params['category_id']).maximum(:post_id)
    maxPostNo = maxPostNo == nil ? 1 : maxPostNo + 1

    # ============================
    # 投稿データの登録
    # ============================
    postData = Post.create(
      post_id: maxPostNo,
      category_id: params['category_id'],
      hide_flag: '0',
      ip: params['ip'],
      name: params['name'] == '' ? '名無し' : params['name'],
      mail: params['mail'],
      subject: params['subject'],
      text: params['text'],
      post_date: Time.now
    )

    # ============================
    # データの返却
    # ============================
    if postData.save then
      # 更新データの返却
      getCategoryPostData(params['category_id'], '0')
    else
      # modelのバリデーション結果を返却
      render json: { errors: postData.errors.keys.map { |key| [key, postData.errors.full_messages_for(key)]}.to_h, render: 'show.json.jbuilder' }, status: :unprocessable_entity
    end
  end

  def delete
    # ============================
    # データの返却（削除処理同時実施）
    # ============================
    if Post.where(category_id: params['category_id'], post_id: params['post_id']).update_all(hide_flag: '1') then
      # 更新データの返却
      getCategoryPostData(params['category_id'], '0')
    else
      # modelのバリデーション結果を返却
      render json: { errors: postData.errors.keys.map { |key| [key, postData.errors.full_messages_for(key)]}.to_h, render: 'show.json.jbuilder' }, status: :unprocessable_entity
    end
  end

  def getCategoryPostData(category_id, hide_flag)
    render plain:  Post.where(category_id: category_id, hide_flag: hide_flag).to_json
  end
end
