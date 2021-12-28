class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.integer :category_id, null: false
      t.text :category_name, null: false
      t.string :deleted_flg, null: false

      t.timestamps
    end
  end
end
