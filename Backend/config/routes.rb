Rails.application.routes.draw do
  resources :games, only [:edit,:index,:create,:delete]
  resources :players, only [:edit,:index,:create,:delete]
end
