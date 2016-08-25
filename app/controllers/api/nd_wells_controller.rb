class Api::NdWellsController < ApplicationController
  def index
    if params[:operatorList]
    # binding.pry

      checked_operators = NdOperator.find_checked_operators_in_params(params[:operatorList])
      puts checked_operators
      @wells = NdWell.where(nd_operator_id: checked_operators)
      puts 'new wells'
      puts @wells
      # render json: {message: "hellooooooo"}
      render 'index.json.jbuilder'
    else
    # @wells = NdWell.includes(:nd_monthly_productions).where("cum_oil > ?", 0).limit(100).order("RANDOM()")
    # @wells = NdWell.where("cum_oil > ?", 0).limit(100).order("RANDOM()")
      @wells = NdWell.joins(:nd_operator).where("well_count > ? AND cum_oil > ?", 50, 0).limit(100).order("RANDOM()")
      render 'index.json.jbuilder'
    end
  end

  def show
    @well = NdWell.includes(:nd_monthly_productions).find_by(id: params[:id])
    render 'show.json.jbuilder'
  end

  def operators
    @operators = NdOperator.all
    render 'operators.json.jbuilder'
  end

end
