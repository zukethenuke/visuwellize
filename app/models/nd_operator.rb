class NdOperator < ActiveRecord::Base
  has_many :nd_wells


  def self.find_checked_operators_in_params(operators)
    checked_operators = []
    # binding.pry
    operators.each do |operator|
      if operator['checked'] == true
        checked_operators << operator['id']
      end
    end
    checked_operators
  end
end
