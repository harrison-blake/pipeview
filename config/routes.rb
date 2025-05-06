Rails.application.routes.draw do
  root "pages#home"
  resources :appointments, only: [:new, :create]

  namespace :admin do
    get "login", to: "sessions#new"
    post "login", to: "sessions#create"
    delete "logout", to: "sessions#destroy"

    get "dashboard", to: "dashboard#index"
  end
end
