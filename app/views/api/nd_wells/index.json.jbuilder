json.array! @wells.each do |well|
  json.partial! 'nd_wells.json.jbuilder', well: well
end