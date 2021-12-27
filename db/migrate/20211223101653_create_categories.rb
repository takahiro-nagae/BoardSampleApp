class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.text :category_id
      t.text :category_name
      t.text :deleted_flg

      t.timestamps
    end
  end
end
