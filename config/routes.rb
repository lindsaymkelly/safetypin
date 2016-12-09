Rails.application.routes.draw do
  resources :sessions, except: [:show, :edit, :update]
  resources :users

  root 'sessions#index'
end
