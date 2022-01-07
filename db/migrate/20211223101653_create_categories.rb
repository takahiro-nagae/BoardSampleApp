class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.text :category_name, null: false, limit:512
      t.string :deleted_flag, null: false, limit: 1

      t.timestamps
    end
  end
end
