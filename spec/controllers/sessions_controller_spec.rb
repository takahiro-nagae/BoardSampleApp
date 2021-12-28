require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
    describe "PostAPI" do
        it "ログイン成功" do
            post 'login', params: { user: {email: 'test@test.com', password: 'admin'} }
            expect(response.status).to eq(200)
        end
        it "ログイン失敗（メールアドレス違い）" do
            post 'login', params: { user: {email: 'testtt@test.com', password: 'admin'} }
            json = JSON.parse(response.body)
            expect(json['status']).to eq(401)
        end
        it "ログイン失敗（パスワード違い）" do
            post 'login', params: { user: {email: 'test@test.com', password: 'Admin'} }
            json = JSON.parse(response.body)
            expect(json['status']).to eq(401)
        end
    end

    describe "GetAPI" do
        it "未ログインチェック" do
            get 'logged_in?'
            json = JSON.parse(response.body)
            expect(json['logged_in']).to eq(false)
        end
        it "ログインチェック" do
            post 'login', params: { user: {email: 'test@test.com', password: 'admin'} }
            get 'logged_in?'
            json = JSON.parse(response.body)
            expect(json['logged_in']).to eq(true)
        end
    end

    describe "DeleteAPI" do
        it "ログアウト" do
            post 'login', params: { user: {email: 'test@test.com', password: 'admin'} }
            delete 'logout'
            json = JSON.parse(response.body)
            expect(json['logged_out']).to eq(true)
        end
    end
end
