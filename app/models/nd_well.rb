class NdWell < ActiveRecord::Base
  has_many :nd_monthly_productions
  belongs_to :nd_operator

  def self.c #reate_rig_tree 
    tree = {}
    wells = NdWell.where('drilling_contractor IS NOT NULL')
    operators = (wells.map { |well| well[:operator] }).uniq!
    tree["name"] = "operators"
    tree["children"] = []
    operators.each do |operator|
      tree["children"] << {"name" => operator, "children" => []}
    end
    NdWell.dc_branch(wells, tree)
    return tree
  end

  def self.dc_branch(wells, tree)
    tree["children"].each do |child|
      dc_array = []
      wells.each do |well|
        if child["name"] == well[:operator]
          dc_array << well[:drilling_contractor]
        end
      end
      if dc_array.count > 1
        dcs = dc_array.uniq! # nil if only one well, don't know why
      else
        dcs = dc_array # fix nil bug if only on well
      end
      dcs.each do |dc|
        child["children"] << {"name" => dc, "children" => []}
      end
    end
    return tree
  end

end


