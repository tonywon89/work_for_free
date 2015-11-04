class UsersController < ApplicationController
  def show 
    @user = User.find(params[:id])

    if current_user && request.get? && params.has_key?(:ftime)
      free = FreeTime.find(current_user.free_time_id)
      free.update(free_time: params[:ftime].to_i, user_id: current_user.id)

      params[:is_work] = params[:is_work] === "true" ? true : false

      record = current_user.records.create(is_work: params[:is_work], description: params[:description], 
        time_spent: params[:stime])
      
      params.delete :ftime
      params.delete :is_work
      params.delete :description
      params.delete :stime
    end

    if current_user
      if current_user.free_time_id.blank? #check if new user

        # Initial values for new user
        initial_free = 0
        initial_work_button = "General Work" 
        initial_free_button = "General Relax"

        free = FreeTime.create(free_time: initial_free, user_id: current_user.id)
        current_user.update(free_time_id: free.id)

        # create initial work buttons
        work = WorkRelaxButton.create(is_work: true, description: initial_work_button, user_id: current_user.id)
        free = WorkRelaxButton.create(is_work: false, description: initial_free_button, user_id: current_user.id)
      end
      @freeTime = FreeTime.find(current_user.free_time_id).free_time # assign the free time to be used by the view
      user_id = current_user.id
      @workRelaxButtons = WorkRelaxButton.where("user_id = ?", user_id)
      
      gon.freeTime = @freeTime
      gon.workRelaxButtons = @workRelaxButtons
      gon.user = @user
    else 
      redirect_to new_user_session_path
    end

  end
end