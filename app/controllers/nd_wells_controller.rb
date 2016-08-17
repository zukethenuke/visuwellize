class NdWellsController < ApplicationController

  def opening_page
    render 'opening_page.html.erb'
  end

  def index
    @wells = NdWell.limit(10)
    render 'index.html.erb'
  end

  def show
    @well = NdWell.find_by(id: params[:id])
    render 'show.html.erb'
  end

  def charts
    # @wells = NdWell.includes(:nd_monthly_productions).where("cum_oil > ?", 0).limit(100).order("RANDOM()")
    @wells = NdWell.where("cum_oil > ?", 0).limit(100).order("RANDOM()")
    render 'charts.html.erb'
  end



end