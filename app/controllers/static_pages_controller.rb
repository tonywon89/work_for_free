class StaticPagesController < ApplicationController
  def home
    if current_user 
      @user = current_user
    end
  end

  def save
  end

  def help
  end

  def about 
  end
end
