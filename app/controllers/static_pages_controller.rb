class StaticPagesController < ApplicationController
  def home
  
    if current_user && request.get? && params.has_key?(:ftime)
      free = FreeTime.find(current_user.free_time_id)
      free.update(free_time: params[:ftime].to_i, user_id: current_user.id)
      params.delete :ftime

    end

    if current_user
      if current_user.free_time_id.blank? #check if new user
        free = FreeTime.create(free_time: 0, user_id: current_user.id)
        current_user.update(free_time_id: free.id)
      end
      @freeTime = FreeTime.find(current_user.free_time_id).free_time # assign the free time to be used by the view

    else 
      @freeTime = 0
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
