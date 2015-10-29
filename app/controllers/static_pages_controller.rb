class StaticPagesController < ApplicationController
  def home
    if current_user
      @freeTime = 5000
    else 
      @freeTime = 0
    end
    gon.freeTime = @freeTime

  end

  def help
  end

  def about 
  end
end
