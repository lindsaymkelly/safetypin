Rails.application.routes.draw do
  resources :sessions, except: [:show, :edit, :update]
  resources :users
  resources :locations

  root 'sessions#index'
end
