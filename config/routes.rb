Rails.application.routes.draw do

  resources :sessions do
    resources :projects
  end

  resources :projects, only: [:show, :update] do
    resources :scores, only: [:create]
  end
  
  root 'pages#home'
end
