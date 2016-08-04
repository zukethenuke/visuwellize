class CreateNdMonthlyProductions < ActiveRecord::Migration
  def change
    create_table :nd_monthly_productions do |t|
      t.integer :nd_well_id
      t.string :pool
      t.date :date
      t.integer :bbls_oil
      t.integer :bbls_water
      t.integer :mcf_prod

      t.timestamps null: false
    end
  end
end
