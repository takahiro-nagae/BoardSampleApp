class Category < ApplicationRecord
    # ============================
    # validate:category_id
    # ============================
    # 必須項目
    validates :category_id, presence: { message: "投稿処理が失敗しました。ページを更新して再度お試しください。" }
    # 最大桁数:8
    validates :category_id, length: {maximum: 8, message: "投稿処理が失敗しました。ページを更新して再度お試しください。"}
    # ============================
    # validate:category_name
    # ============================
    # 必須項目
    validates :category_name, presence: { message: "投稿処理が失敗しました。ページを更新して再度お試しください。" }
    # 最大桁数:256
    validates :category_name, length: {maximum: 512, message: "カテゴリ名は512文字以内で入力してください"}
end
