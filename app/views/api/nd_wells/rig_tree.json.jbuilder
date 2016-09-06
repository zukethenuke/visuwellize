json.name @tree["name"]
json.children @tree["children"].each do |operator|
  json.name operator["name"]
  json.children operator["children"].each do |dc|
    json.name dc["name"]
    json.children dc["children"].each do |rig|
      json.name rig["name"]
      json.children rig["children"].each do |well|
        json.name well["name"]
      end
    end
  end
end



  