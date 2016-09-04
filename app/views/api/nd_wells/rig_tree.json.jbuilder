json.array! @wells.each do |well|
  json.id well.id
  json.operator well.operator
  json.wellName well.well_name
  json.spudDate well.spud_date
  json.td well.td
  json.latitude well.latitude
  json.longitude well.longitude
  json.cumOil well.cum_oil
  json.NdOperatorId well.nd_operator_id
  json.drillingContractor well.drilling_contractor
  json.rig well.rig
end