json.array! @tree["children"].each do |operator|
  json.name operator["name"]
  json.children operator["children"].each do |dc|
    json.drillingContracto dc["name"]
  end
end
  


  