class CategoryController < ApplicationController
  def get
    getCategory
  end

  def regist

    # ============================
    # 投稿データの登録
    # ============================
    categoryData = Category.create(
      category_name: params['category_name'],
      deleted_flag: '0'
    )

    # ============================
    # データの返却
    # ============================
    if categoryData.save then
      # 更新データの返却
      getCategory
    else
      # modelのバリデーション結果を返却
      render json: { errors: postData.errors.keys.map { |key| [key, postData.errors.full_messages_for(key)]}.to_h, render: 'show.json.jbuilder' }, status: :unprocessable_entity
    end
  end

  def delete
    # ============================
    # データの返却（削除処理同時実施）
    # ============================
    if Category.find(params['category_id']).update(deleted_flag: '1') then
      # 更新データの返却
      getCategory
    else
      # modelのバリデーション結果を返却
      render json: { errors: categoryData.errors.keys.map { |key| [key, categoryData.errors.full_messages_for(key)]}.to_h, render: 'show.json.jbuilder' }, status: :unprocessable_entity
    end
  end

  def edit
    # ============================
    # データの返却（編集処理同時実施）
    # ============================
    if Category.find(params['category_id']).update(category_name: params['category_name']) then
      # 更新データの返却
      getCategory
    else
      # modelのバリデーション結果を返却
      render json: { errors: categoryData.errors.keys.map { |key| [key, categoryData.errors.full_messages_for(key)]}.to_h, render: 'show.json.jbuilder' }, status: :unprocessable_entity
    end
  end

  private
    def getCategory
      category = Category.where(deleted_flag: '0')
      render plain:category.to_json
    end
end
