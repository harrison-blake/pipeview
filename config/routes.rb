Rails.application.routes.draw do
  root "pages#home"
  resources :appointments, only: [:new, :create]
end
