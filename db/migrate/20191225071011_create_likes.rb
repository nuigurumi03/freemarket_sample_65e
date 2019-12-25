class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.integer :nice
      t.integer :user_id null:false, foreign_key: true
      t.integer :product_id null: false, foreign_key: true
      t.timestamps
    end
  end
end
