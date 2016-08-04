class AddColumnToNdWells < ActiveRecord::Migration
  def change
    add_column :nd_wells, :operator_id, :integer
  end
end
