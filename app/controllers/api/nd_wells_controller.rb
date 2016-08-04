class Api::NdWellsController < ApplicationController
  def index
    @wells = NdWell.limit(100)
    render 'index.json.jbuilder'
  end

  def show
    @well = NdWell.find_by(id: params[:id])
    render 'show.json.jbuilder'
  end
end
