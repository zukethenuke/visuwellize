class AddRigToNdWells < ActiveRecord::Migration
  def change
    add_column :nd_wells, :drilling_contractor, :string
    add_column :nd_wells, :rig, :string
  end
end
