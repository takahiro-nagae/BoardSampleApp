# カテゴリ新規登録
Category.create(category_id: 1, category_name:'時事ニュース', deleted_flag:'0')
Category.create(category_id: 2, category_name:'スポーツ', deleted_flag:'0')
Category.create(category_id: 3, category_name:'削除カテゴリ', deleted_flag:'1')
# 投稿データ登録
Post.create(post_id: 1, category_id: 1, hide_flag: '0', ip: '192.168.0.1', name:'名無し', mail: 'nanashi@test.com', subject: '最近のニュース', text:'何か見た？', post_date: Time.now)
# ユーザ作成
User.create(name: "admin", email:"test@test.com", password:"admin", password_confirmation:"admin")