json.array! @operators.each do |operator|
  json.id operator.id
  json.name operator.name
  json.wellCount operator.well_count
end