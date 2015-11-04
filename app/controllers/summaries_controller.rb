class SummariesController < ApplicationController
 include SummariesHelper

  def show
    @work_records = current_user.records.where("is_work = ?", true)
    @relax_records = current_user.records.where("is_work = ?", false)
    @records = current_user.records
    @totalWork = 0
    @totalRelax = 0 

    @records.each do |record|
      time_spent = record.time_spent  
      record.is_work ? @totalWork += time_spent : @totalRelax += time_spent
    end

    @work_graph = pie_chart(@work_records, "Work Activity", "1D804E")
    @relax_graph = pie_chart(@relax_records, "Relax Activity", "5D9BBA")
    
  end
end