class CreateWorkRelaxButtons < ActiveRecord::Migration
  def change
    create_table :work_relax_buttons do |t|
      t.boolean :is_work
      t.string :description
      t.integer :user_id

      t.timestamps
    end
  end
end
