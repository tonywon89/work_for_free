class FreeTimesController < ApplicationController

  def edit 

  end

  def update 
    new_free_time = Integer(params[:free_time][:free_time])
    user = User.find(FreeTime.find(params[:id]).user_id)
    user.free_time.update(free_time: new_free_time)
    redirect_to users_path

  end

end