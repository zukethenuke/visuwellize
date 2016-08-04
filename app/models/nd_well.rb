class NdWell < ActiveRecord::Base
  has_many :nd_monthly_productions
  belongs_to :nd_operator

end


