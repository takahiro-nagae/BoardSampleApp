require 'rails_helper'

RSpec.describe BoardController, type: :controller do
  describe "GetAPI" do
    it "トップページを表示" do
      get 'index'
      expect(response.status).to eq(200)
    end
  end
end