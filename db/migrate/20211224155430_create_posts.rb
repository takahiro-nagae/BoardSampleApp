class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.text :thread_id

      t.timestamps
    end
  end
end
