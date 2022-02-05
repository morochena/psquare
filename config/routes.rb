Rails.application.routes.draw do

  resources :sessions do
    resources :projects
  end

  resources :projects, only: [:show, :update] do
    get :edit_form, on: :member
    resources :scores, only: [:create]
  end
  
  root 'pages#home'
end
