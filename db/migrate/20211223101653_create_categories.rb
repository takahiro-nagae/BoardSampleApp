class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.integer :category_id, null: false, limit: 4
      t.text :category_name, null: false, limit:512
      t.string :deleted_flg, null: false, limit: 1

      t.timestamps
    end
  end
end
