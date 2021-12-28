require 'rails_helper'

RSpec.describe CategoryController, type: :controller do
  describe "GetAPI" do
    it "カテゴリデータを取得" do
      get 'get'
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
    end
  end
  describe "PostAPI" do
    it "カテゴリデータを登録" do
      expect { post 'regist', params: { category_name: 'テストカテゴリ' } }.to change(Category, :count).by(+1)
      expect(response.status).to eq(200)
    end
    it "カテゴリデータを削除" do
      post 'delete', params: { category_id: 1 }
      expect(response.status).to eq(200)
      expect(Category.find_by(category_id: 1).deleted_flag).to eq('1')
    end
    it "カテゴリデータを編集" do
      category_id = 1
      category_name = 'カテゴリ名編集'
      post 'edit', params: { category_id: category_id, category_name: category_name}
      expect(response.status).to eq(200)
      expect(Category.find_by(category_id: 1).category_id).to eq(category_id)
      expect(Category.find_by(category_id: 1).category_name).to eq(category_name)
    end
  end
end
