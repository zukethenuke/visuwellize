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
    tree["children"].each do |operator|
      dc_array = []
      wells.each do |well|
        if operator["name"] == well[:operator]
          dc_array << well[:drilling_contractor]
        end
      end
      if dc_array.count > 1
        dcs = dc_array.uniq! # nil if only one well, don't know why
      else
        dcs = dc_array # fix nil bug if only on well
      end
      dcs.each do |dc|
        operator["children"] << {"name" => dc, "children" => []}
      end
    end
    NdWell.rig_branch(wells, tree)
    return tree
  end

  def self.rig_branch(wells, tree)
    tree["children"].each do |operator|
      operator["children"].each do |dc|
        rig_array = []
        wells.each do |well|
          if dc["name"] == well[:drilling_contractor] && operator["name"] == well[:operator]
            rig_array << well[:rig]
          end
        end

        if rig_array.count > 1
          rigs = rig_array.uniq!
        else
          rigs = rig_array
        end
        if !rigs.nil?
          rigs.each do |rig|
            dc["children"] << {"name" => rig, "children" => []}
          end
        end
      end
    end
    NdWell.wells_branch(wells, tree)
    return tree
  end

  def self.wells_branch(wells, tree)
    # tree["children"].each do |operator|
    #   operator["children"].each do |dc|
    #    dc["children"].each do |rig|

    #    end
    #   end
  end
end


