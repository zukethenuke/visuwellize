class NdWellsController < ApplicationController

  def opening_page
    render 'opening_page2.html.erb'
  end

  def index
    @wells = NdWell.limit(10)
    render 'index.html.erb'
  end

  def show
    @well = NdWell.find_by(id: params[:id])
    render 'show.html.erb'
  end

  def scatter
    @wells = NdWell.includes(:nd_monthly_productions).where("cum_oil > ?", 0).limit(100).order("RANDOM()")
    render 'scatter.html.erb', :layout => false
  end



end