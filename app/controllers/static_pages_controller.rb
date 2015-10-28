class StaticPagesController < ApplicationController
  def home
    if current_user
      @free_time = 5000
    else
      @free_time = 0
    end
  end

  def help
  end

  def about 
  end
end
