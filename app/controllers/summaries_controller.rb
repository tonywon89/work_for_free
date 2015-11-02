class SummariesController < ApplicationController
  def show
    @records = current_user.records
  end
end