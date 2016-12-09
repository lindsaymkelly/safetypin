Rails.application.routes.draw do
  resources :locations
  resources :sessions

  root 'sessions#index'
end
