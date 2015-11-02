class CreateRecords < ActiveRecord::Migration
  def change
    create_table :records do |t|
      t.boolean :is_work
      t.string :description
      t.integer :time_spent
      t.integer :user_id
      
      t.timestamps
    end
  end
end
