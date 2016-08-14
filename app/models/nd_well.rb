class NdWell < ActiveRecord::Base
  has_many :nd_monthly_productions
  belongs_to :nd_operator

  def cumulative_oil
    sum = 0
    nd_monthly_productions.each do |x|
      sum += x.bbls_oil
    end
    sum
  end

end


