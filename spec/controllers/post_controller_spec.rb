require 'rails_helper'

RSpec.describe PostController, type: :controller do
  describe "GetAPI" do
    it "投稿TOPを表示" do
        get 'index'
        expect(response.status).to eq(200)
      end
    it "カテゴリデータを取得" do
      get 'get'
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
    end
  end
  describe "PostAPI" do
    it "カテゴリデータを登録" do
      expect { post 'regist', params: { category_id: 1 , ip: '172.17.0.62', name:'', mail: '', text: 'テストです'} }.to change(Post, :count).by(+1)
      expect(response.status).to eq(200)
    end
    it "カテゴリデータを削除" do
        category_id = 1
        post_id = 1
      post 'delete', params: { category_id: category_id, post_id: post_id}
      expect(response.status).to eq(200)
      expect(Post.find_by(category_id: category_id, post_id: post_id).hide_flag).to eq('1')
    end
  end
end