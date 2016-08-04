class CreateNdOperators < ActiveRecord::Migration
  def change
    create_table :nd_operators do |t|
      t.string :name
      t.integer :well_count

      t.timestamps null: false
    end
  end
end
