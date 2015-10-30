class ButtonsController < ApplicationController
  def new
    if !current_user
      redirect_to root_path
    end
  end

  def create
    if params[:buttons][:work_relax] === "true"
      params[:buttons][:work_relax] = true
    else
      params[:buttons][:work_relax] = false
    end
    WorkRelaxButton.create(is_work: params[:buttons][:work_relax], description: params[:buttons][:description],
      user_id: current_user.id)
    redirect_to root_path
  end

  def destroy
  end
end
