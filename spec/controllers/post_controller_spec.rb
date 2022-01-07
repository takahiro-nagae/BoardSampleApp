require 'rails_helper'

RSpec.describe PostController, type: :controller do
  describe "GetAPI" do
    it "投稿TOPを表示" do
        get 'index'
        expect(response.status).to eq(200)
      end
    it "投稿データを取得" do
      get 'get'
      json = JSON.parse(response.body)
      expect(response.status).to eq(200)
    end
  end
  describe "PostAPI" do
    it "投稿データを登録" do
      expect { post 'regist', params: { category_id: 1 , ip: '172.17.0.62', name:'', mail: '', text: 'テストです'} }.to change(Post, :count).by(+1)
      expect(response.status).to eq(200)
    end
    it "投稿データを削除" do
        category_id = 1
        id = 1
      post 'delete', params: { category_id: category_id, id: id}
      expect(response.status).to eq(200)
      expect(Post.find(id).hide_flag).to eq('1')
    end
  end
end