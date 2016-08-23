class Api::NdWellsController < ApplicationController
  def index
    # if params 
    #   @wells = NdWell.where("operator")
    # end
    # @wells = NdWell.includes(:nd_monthly_productions).where("cum_oil > ?", 0).limit(100).order("RANDOM()")
    # @wells = NdWell.where("cum_oil > ?", 0).limit(100).order("RANDOM()")
    @wells = NdWell.joins(:nd_operator).where("well_count > ? AND cum_oil > ?", 50, 0).limit(100).order("RANDOM()")

    render 'index.json.jbuilder'
  end

  def show
    @well = NdWell.includes(:nd_monthly_productions).find_by(id: params[:id])
    render 'show.json.jbuilder'
  end
end
