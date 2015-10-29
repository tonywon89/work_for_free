class AddFreeTimeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :free_time_id, :integer
  end
end
