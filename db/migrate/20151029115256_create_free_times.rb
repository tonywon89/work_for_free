class CreateFreeTimes < ActiveRecord::Migration
  def change
    create_table :free_times do |t|
      t.integer :free_time
      t.integer :user_id
      t.timestamps
    end
  end
end
