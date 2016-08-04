class RenameOperatorToNdOperator < ActiveRecord::Migration
  def change
    rename_column :nd_wells, :operator_id, :nd_operator_id
  end
end
