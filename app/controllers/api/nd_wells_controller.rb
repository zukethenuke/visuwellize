class Api::NdWellsController < ApplicationController
  def index
    # @wells = NdWell.includes(:nd_monthly_productions).where("cum_oil > ?", 0).limit(100).order("RANDOM()")
    @wells = NdWell.where("cum_oil > ?", 0).limit(100).order("RANDOM()")
    render 'index.json.jbuilder'
  end

  def show
    @well = NdWell.includes(:nd_monthly_productions).find_by(id: params[:id])
    render 'show.json.jbuilder'
  end
end
