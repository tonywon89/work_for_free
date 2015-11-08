class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def destroy
    User.find(params[:id]).delete
    redirect_to users_path

  end

  def show 
    @user = User.find(params[:id])

    # Update the free time and saves a record of the activity
    if current_user && request.get? && params.has_key?(:ftime)
      current_user.free_time.update(free_time: params[:ftime].to_i)

      params[:is_work] = params[:is_work] === "true" ? true : false

      record = current_user.records.create(is_work: params[:is_work], description: params[:description], 
        time_spent: params[:stime])

      params.each do |key, value| 
        params.delete key
      end

    end

    if current_user

      # Check if new user
      if current_user.free_time_id.blank? 

        # Initial values for new user
        initial_free = 0
        initial_work_button = "This is a Work Button. Starting the timer when this is selected with increase your free time" 
        initial_relax_button = "This is Relax Button. Starting the timer when this is selected will decrease your free time"
        edit_work_button = "You can edit these buttons, add your own button, or delete these buttons by clicking 'Add/edit buttons'"
        summary_relax_button = "You can view your activity log by clicking the 'Summary' link in the navigation bar"

        # Creates the Free Time item associated with the user
        free = FreeTime.create(free_time: initial_free, user_id: current_user.id)
        current_user.update(free_time_id: free.id)

        # Create initial work buttons
        current_user.work_relax_buttons.create(is_work: true, description: initial_work_button)
        current_user.work_relax_buttons.create(is_work: true, description: edit_work_button)
        current_user.work_relax_buttons.create(is_work: false, description: initial_relax_button)
        current_user.work_relax_buttons.create(is_work: false, description: summary_relax_button)


      end

      @freeTime = current_user.free_time.free_time # assign the free time to be used by the view
      @buttons = current_user.work_relax_buttons
      
      # assign variables to be used by javascript
      gon.freeTime = @freeTime
      gon.user = @user
    else 
      redirect_to new_user_session_path
    end

  end
end