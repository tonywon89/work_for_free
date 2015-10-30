class UsersController < ApplicationController
  def show 
    @user = User.find(params[:id])


    if current_user && request.get? && params.has_key?(:ftime)
      free = FreeTime.find(current_user.free_time_id)
      free.update(free_time: params[:ftime].to_i, user_id: current_user.id)
      params.delete :ftime

    end

    if current_user
      if current_user.free_time_id.blank? #check if new user
        free = FreeTime.create(free_time: 0, user_id: current_user.id)
        current_user.update(free_time_id: free.id)

        # create initial work buttons
        work = WorkRelaxButton.create(is_work: true, description: "General work", user_id: current_user.id)
        free = WorkRelaxButton.create(is_work: false, description: "General relax", user_id: current_user.id)
      end
      @freeTime = FreeTime.find(current_user.free_time_id).free_time # assign the free time to be used by the view
      user_id = current_user.id
      @workRelaxButtons = WorkRelaxButton.where("user_id = #{current_user.id}")
      
    else 
      @freeTime = 0
    end
    gon.freeTime = @freeTime
    gon.workRelaxButtons = @workRelaxButtons
    gon.user = @user
  end
end