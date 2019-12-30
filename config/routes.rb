Rails.application.routes.draw do

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
  }
  devise_scope :user do
    get 'step1', to: 'users/registrations#new_step1'
    post 'step1',  to: 'users/registrations#create_step1'
  end  
  root 'users#index'
  get "signup", to: "signup#index"
  get "users/index", to: "users#index"
  get 'products/error'
  resources :products, only: [:index, :new, :create, :show]
  resources :users, only: [:index, :show, :edit, :update]

  resources :signup, only: [:new ]do
    collection do
      get 'step1'
      post 'step2'
      post 'step3'  #入力が全て完了
      post 'step4'
      get 'complete_signup'  #登録完了後
    end
  end
end
