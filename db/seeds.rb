# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'csv'

# csv_file = File.open(Rails.root.join('lib', 'seeds', 'WellIndex_reduced_for_database.csv'))
# CSV.foreach(csv_file, :headers => true, :header_converters => :symbol) do |row|
#   p row[:file_no]
#   NdWell.create(
#     api_no: row[:api_no],
#     file_no: row[:file_no],
#     operator: row[:operator],
#     well_name: row[:well_name],
#     spud_date: row[:spud_date],
#     td: row[:td],
#     field_name: row[:field_name],
#     latitude: row[:latitude],
#     longitude: row[:longitude],
#     well_type: row[:well_type],
#     well_status: row[:well_status],
#     cum_oil: row[:cum_oil],
#   )
# end

# hashes = []  # peter
# csv_file = File.open(Rails.root.join('lib', 'seeds', 'monthly_production_info_reduced_for_database.csv'))
# CSV.foreach(csv_file, :headers => true, :header_converters => :symbol) do |row|
#   p row[:nd_well_id]
  
#   NdMonthlyProduction.create(
#     nd_well_id: row[:nd_well_id],
#     pool: row[:pool],
#     date: row[:date],
#     bbls_oil: row[:bbls_oil],
#     bbls_water: row[:bbls_water],
#     mcf_prod: row[:mcf_prod]
#   )

  # hashes << {   # peter, seed everything at once
  #   nd_well_id: row[:nd_well_id],
  #   pool: row[:pool],
  #   date: row[:date],                 
  #   bbls_oil: row[:bbls_oil],
  #   bbls_water: row[:bbls_water],
  #   mcf_prod: row[:mcf_prod]
  # }
# end
# NdMonthlyProduction.create(hashes) # peter

