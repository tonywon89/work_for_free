class SummariesController < ApplicationController
  def show
    @records = current_user.records
    @totalWork = 0
    @totalRelax = 0 

    @records.each do |record|
      time_spent = record.time_spent  
      record.is_work ? @totalWork += time_spent : @totalRelax += time_spent
    end
  end
end