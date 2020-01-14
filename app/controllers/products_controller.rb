class ProductsController < ApplicationController

  layout false, only: [:index, :new, :show] 
  # before_action :set_categories, only: %w[edit new create index ]
  def new
    @product = Product.new
    @address = Prefecture.all
    @brand = Brand.all
  end
  def create
    @product = Product.new(product_params)
    if @product.save
      redirect_to root_path
    else
      render 'new'
    end
  end

  def index

    @products = Product.includes(:images)
    @product = Product.find[:id]
    @image = Image.all

  end
  
  def show
    @product = Product.find(params[:id])
  end

  def edit
    @product = Product.find(params[:id])
  end


  def detail
    @product = Product.find(params[:id])
  end

  def dynamic_select_category
    @category = Category.find(params[:category_id])
  end

  def destroy
    product = Product.find(params[:id])
    if product.user.id == current_user.id
      product.delete
    end
    redirect_to root_path
  end



  private
  def product_params


    params.require(:product).permit( :title, :info, :status, :postage, :category_id, :brand_id, :prefecture, :shipping, :day, :price, images_attributes: [:image])


  end

  def set_product
    @product = Product.find(params[:id])
  end
end

private
def set_categories
  @parent_categories = Category.roots
  @default_child_categories = @parent_categories.first.children
end
