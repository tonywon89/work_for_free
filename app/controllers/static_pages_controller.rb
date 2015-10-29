class StaticPagesController < ApplicationController
  def home
  
    if current_user && request.get? && params.has_key?(:ftime)

      free = FreeTime.find(current_user.free_time_id)
      free.update(free_time: params[:ftime].to_i, user_id: current_user.id)
      params.delete :ftime
    end

    if current_user
      @freeTime = FreeTime.find(current_user.free_time_id).free_time
    else 
      @freeTime = 1
    end
    gon.freeTime = @freeTime

  end

  def save
    
  end

  def help
  end

  def about 
  end
end
