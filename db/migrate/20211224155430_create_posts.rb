class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.integer :post_id, null: false
      t.integer :category_id, null: false
      t.string  :hide_flag
      t.string :ip, null: false
      t.string :name
      t.string :mail
      t.string :subject
      t.text :text, null: false
      t.timestamps :post_date, null: false

      t.timestamps
    end
  end
end
