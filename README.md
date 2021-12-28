# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

# アーキテクチャ
* フロントエンド
- React 17.0.2
- Typescript 4.5.4
* バックエンド
- Ruby 2.6.9
- Rails 6.1.4.4

# データベース初期化
* 開発系
rake db:reset
* テスト系
bundle exec rake db:reset RAILS_ENV=test

# トップページ
localhost:3000/board/index

# テスト実行
bundle exec rspec
