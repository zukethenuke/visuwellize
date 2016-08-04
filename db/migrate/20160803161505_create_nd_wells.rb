class CreateNdWells < ActiveRecord::Migration
  def change
    create_table :nd_wells do |t|
      t.bigint :api_no
      t.integer :file_no
      t.string :operator
      t.string :well_name
      t.date :spud_date
      t.integer :td
      t.string :field_name
      t.float :latitude
      t.float :longitude
      t.string :well_type
      t.string :well_status
      t.integer :cum_oil

      t.timestamps null: false
    end
  end
end
