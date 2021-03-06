class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :title, null: false
      t.integer :price, null: false
      t.text :info, null: false
      t.string :status, null: false
      t.string :postage, null: false
      t.string :shipping, null: false
      t.integer :prefecture_id, null: false
      t.string :day, null: false
      t.integer :parchaser_id
      t.integer :brand_id, foreign_key: true
      t.integer  :category_id, foreign_key: true
      t.integer  :user_id, foreign_key: true
      t.timestamps
    end
  end
end
