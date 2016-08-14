class NdWellsController < ApplicationController
  def index
    @wells = NdWell.limit(10)
    render 'index.html.erb'
  end

  def show
    @well = NdWell.find_by(id: params[:id])
    render 'show.html.erb'
  end
end