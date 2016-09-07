Rails.application.routes.draw do
  get '/' => 'nd_wells#opening_page'
  get '/nd' => 'nd_wells#index'
  get '/nd/scatter' => 'nd_wells#scatter'
  get '/nd/rig_tree' => 'nd_wells#rig_tree'
  get '/nd/:id' => 'nd_wells#show'

  namespace :api do
    get '/nd' => 'nd_wells#index'
    post '/nd' => 'nd_wells#index'
    post '/nd/animation' => 'nd_wells#animation'
    get '/nd/operators' => 'nd_wells#operators'
    get '/nd/rig_tree' => 'nd_wells#rig_tree'
    get '/nd/:id' => 'nd_wells#show'
  end
end
