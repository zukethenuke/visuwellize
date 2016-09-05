json.operators @tree["name"]
json.children @tree["children"].each do |operator|
  json.operator operator["name"]
  json.children operator["children"].each do |dc|
    json.drillingContractor dc["name"]
    json.children dc["children"].each do |rig|
      json.rig rig["name"]
    end
  end
end



  