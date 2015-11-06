class ButtonsController < ApplicationController
  def new
    @user = current_user
    # Redirect user to home path if not logged in
    if !current_user
      redirect_to root_path
    end
  end

  def create
    params[:buttons][:work_relax] = params[:buttons][:work_relax] === "true" ? true : false
  
    WorkRelaxButton.create(is_work: params[:buttons][:work_relax], description: params[:buttons][:description],
      user_id: current_user.id)
    redirect_to buttons_path
  end


  def index
    if !current_user
      redirect_to root_path
    else 
      @buttons = current_user.work_relax_buttons
    end
  end

  def edit
    if !current_user
      redirect_to root_path
    else 
      @button = WorkRelaxButton.find(params[:id])
    end 
  end

  def update 
    params[:buttons][:work_relax] = params[:buttons][:work_relax] === "true" ? true : false
    
    button = WorkRelaxButton.find(params[:id])
    button.update(is_work: params[:buttons][:work_relax], description: params[:buttons][:description])
    redirect_to buttons_path
    
  end

  def destroy
    params[:delete].each do |id|
      WorkRelaxButton.find(id[0].to_i).destroy
    end
    redirect_to buttons_path
  end
end
