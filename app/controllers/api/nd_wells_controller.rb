class Api::NdWellsController < ApplicationController
  def index
    if params[:operatorList]
    # binding.pry

      checked_operators = NdOperator.find_checked_operators_in_params(params[:operatorList])
      @wells = NdWell.where(nd_operator_id: checked_operators).where('cum_oil > 0 AND td IS NOT NULL')
      render 'index.json.jbuilder'
    else
    # @wells = NdWell.includes(:nd_monthly_productions).where("cum_oil > ?", 0).limit(100).order("RANDOM()")
    # @wells = NdWell.where("cum_oil > ?", 0).limit(100).order("RANDOM()")
      @wells = NdWell.joins(:nd_operator).where("well_count > ? AND cum_oil > ? AND td IS NOT NULL", 50, 0).limit(100).order("RANDOM()")
      render 'index.json.jbuilder'
    end
  end

  def show
    @well = NdWell.includes(:nd_monthly_productions).find_by(id: params[:id])
    render 'show.json.jbuilder'
  end

  def animation
    puts "params"
    puts params
    # @wells = NdWell.where('spud_date > params[:start_year] AND spud_date < params[:end_year]')
    # @wells = NdWell.includes(:nd_monthly_productions).where('spud_date > ? AND spud_date < ? AND td IS NOT NULL', params[:start_year], params[:end_year])
    @wells = NdWell.where('spud_date > ? AND spud_date < ? AND td IS NOT NULL', params[:start_year], params[:end_year])
    render 'index.json.jbuilder'
  end

  def operators
    @operators = NdOperator.all
    render 'operators.json.jbuilder'
  end

  def rig_tree
    @tree = NdWell.c #reate_rig_tree
    p @tree
    # @drilling_contractors = NdWells.select(:drilling_contractor).distinct
    render 'rig_tree.json.jbuilder'
  end

end
