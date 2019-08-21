Rails.application.routes.draw do
  resources :players, only: [:index, :create]
  resources :games, only: [:index, :create]
end
