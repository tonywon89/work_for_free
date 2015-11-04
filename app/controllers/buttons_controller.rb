class ButtonsController < ApplicationController
  def new
    @user = current_user
    if !current_user
      redirect_to root_path
    end
  end

  def create
    params[:buttons][:work_relax] = params[:buttons][:work_relax] === "true" ? true : false
  
    WorkRelaxButton.create(is_work: params[:buttons][:work_relax], description: params[:buttons][:description],
      user_id: current_user.id)
    redirect_to buttons_edit_path
  end

  def edit 
    @buttons = current_user.work_relax_buttons
  end

  def update
    if request.get?
      @button = WorkRelaxButton.find(params[:button_id])

    else
      params[:buttons][:work_relax] = params[:buttons][:work_relax] === "true" ? true : false
      
      button = WorkRelaxButton.find(params[:button_id])
      button.update(is_work: params[:buttons][:work_relax], description: params[:buttons][:description])
      redirect_to buttons_edit_path
    end
  end

  def destroy
    params[:delete].each do |id|
      WorkRelaxButton.find(id[0].to_i).destroy
    end
    redirect_to current_user
  end
end
